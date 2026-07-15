import { NextResponse } from "next/server";
import { logAdminActivity } from "@/lib/adminUtils";

export async function POST() {
    await logAdminActivity("LOGOUT", "Authentication", "Logged out");

    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    response.cookies.set({
        name: "admin_token",
        value: "",
        httpOnly: true,
        path: "/",
        expires: new Date(0), // Expire immediately
    });
    return response;
}
