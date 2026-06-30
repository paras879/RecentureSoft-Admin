import { NextResponse } from "next/server";
import { getAdminRole } from "@/lib/adminUtils";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
    try {
        const role = await getAdminRole();
        
        let username = "Admin";
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        let permissions = {};

        if (token) {
            const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026");
            const { payload } = await jwtVerify(token, secret);
            if (payload && payload.username) {
                username = payload.username;
                
                // Fetch permissions from database
                if (username !== "superadmin") {
                    await connectDB();
                    const adminDoc = await Admin.findOne({ username });
                    if (adminDoc && adminDoc.permissions) {
                        // Convert Mongoose Map to plain object
                        permissions = Object.fromEntries(adminDoc.permissions);
                    }
                }
            }
        }
        
        return NextResponse.json({ role, username, permissions });
    } catch(e) {
        return NextResponse.json({ role: 'super_admin', username: 'Admin', permissions: {} });
    }
}
