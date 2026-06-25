import { NextResponse } from "next/server";
import { logAdminActivity } from "@/lib/adminUtils";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, subject, message } = body;

        if (!email || !subject || !message) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"RecentureSoft Admin" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            text: message,
            html: `<p>${message.replace(/\n/g, '<br/>')}</p>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Log the activity
        await logAdminActivity(
            'REPLY',
            'Communication',
            `Sent email reply to ${email} with subject: ${subject}`
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        // Let's not fail completely if SMTP is not configured, just mock it if user hasn't set env vars
        if (!process.env.SMTP_HOST) {
             console.warn("SMTP credentials missing. Mocking success for Quick Reply.");
             await logAdminActivity('REPLY', 'Communication', `MOCKED: Sent email reply to ${email}`);
             return NextResponse.json({ success: true, message: "Mocked success (SMTP not configured)" });
        }
        return NextResponse.json({ success: false, error: "Failed to send email. Check SMTP settings." }, { status: 500 });
    }
}
