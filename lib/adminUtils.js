import { connectDB } from "@/lib/mongodb";
import ActivityLog from "@/models/ActivityLog";
import Admin from "@/models/Admin";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function logAdminActivity(action, module, description, defaultUsername = "System") {
    try {
        await connectDB();
        
        // Try to get username from token
        let username = defaultUsername;
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        
        if (token) {
            const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026");
            const { payload } = await jwtVerify(token, secret);
            if (payload && payload.username) {
                username = payload.username;
            }
        }

        await ActivityLog.create({
            action,
            module,
            description,
            adminUsername: username
        });
        
        return true;
    } catch (error) {
        console.error("Error logging admin activity:", error);
        return false;
    }
}

export async function getAdminRole() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        
        if (token) {
            const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026");
            const { payload } = await jwtVerify(token, secret);
            if (payload && payload.role) {
                return payload.role;
            }
        }
        return "super_admin"; // fallback
    } catch {
        return "super_admin";
    }
}

export async function checkPermission(permissionKey, accessType = 'write') {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        if (!token) return false;

        const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026");
        const { payload } = await jwtVerify(token, secret);
        
        if (payload?.role === "super_admin") return true;
        if (!payload?.username) return false;

        await connectDB();
        const adminDoc = await Admin.findOne({ username: payload.username });
        if (!adminDoc || !adminDoc.permissions) return false;

        const permission = adminDoc.permissions.get(permissionKey);
        if (!permission) return false;

        return permission[accessType] === true;
    } catch (e) {
        console.error("Permission check failed:", e);
        return false;
    }
}
