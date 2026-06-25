import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { email } = await req.json();

        await connectDB();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            // Return success even if not found to prevent email enumeration
            return NextResponse.json({ success: true, message: "If that email exists, a reset link was sent." });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

        admin.resetToken = resetToken;
        admin.resetTokenExpiry = resetTokenExpiry;
        await admin.save();

        // Construct reset link using request headers to automatically work on Vercel
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const host = req.headers.get("host") || "localhost:3000";
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;
        const resetLink = `${baseUrl}/admin/reset-password?token=${resetToken}`;

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Setup email data
        const mailOptions = {
            from: `"RecentureSoft Admin" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2>Password Reset Request</h2>
                    <p>Hello <strong>${admin.username}</strong>,</p>
                    <p>We received a request to reset your admin password.</p>
                    <p>Click the button below to set a new password. This link will expire in 1 hour.</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #0ea5e9; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 15px;">Reset Password</a>
                    <p style="margin-top: 25px; font-size: 12px; color: #64748b;">If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        };

        // Send actual email via SMTP
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ 
            success: true, 
            message: "Reset link sent! Please check your email inbox." 
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
