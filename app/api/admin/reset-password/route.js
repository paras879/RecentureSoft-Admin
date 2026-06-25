import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
        }

        await connectDB();

        // Find admin with valid reset token that hasn't expired
        const admin = await Admin.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!admin) {
            return NextResponse.json({ success: false, message: "Invalid or expired reset token." }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and clear token
        admin.password = hashedPassword;
        admin.resetToken = undefined;
        admin.resetTokenExpiry = undefined;
        await admin.save();

        return NextResponse.json({ success: true, message: "Password reset successful!" });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
