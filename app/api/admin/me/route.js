import { NextResponse } from "next/server";
import { getAdminRole } from "@/lib/adminUtils";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
    try {
        const role = await getAdminRole();
        
        let username = "Admin";
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        if (token) {
            const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026");
            const { payload } = await jwtVerify(token, secret);
            if (payload && payload.username) {
                username = payload.username;
            }
        }
        
        return NextResponse.json({ role, username });
    } catch(e) {
        return NextResponse.json({ role: 'super_admin', username: 'Admin' });
    }
}
