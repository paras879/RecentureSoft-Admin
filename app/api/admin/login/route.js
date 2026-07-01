import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, password, captchaToken } = body;

        // Verify reCAPTCHA
        if (!captchaToken) {
            return NextResponse.json({ success: false, message: "Please verify you are not a robot" }, { status: 400 });
        }

        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
        });
        
        const verifyData = await verifyRes.json();
        
        if (!verifyData.success) {
            return NextResponse.json({ success: false, message: "Captcha verification failed. Please try again." }, { status: 400 });
        }

        await connectDB();
        
        // Auto-seed admin if none exists
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const defaultUsername = process.env.ADMIN_USERNAME || "admin";
            const defaultPassword = process.env.ADMIN_PASSWORD || "recenture2026";
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            
            await Admin.create({
                username: defaultUsername,
                email: "parastomar851@gmail.com", // Default email
                password: hashedPassword,
                role: "super_admin"
            });
        }

        // Find admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }
        
        // Login activity logging removed per user request

        // Create JWT token
        const secret = new TextEncoder().encode(
            process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026"
        );

        const token = await new SignJWT({ role: admin.role || "super_admin", username })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);

        // Set cookie
        const response = NextResponse.json(
            { success: true, message: "Login successful" },
            { status: 200 }
        );

        response.cookies.set({
            name: "admin_token",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return response;
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
