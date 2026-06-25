import ManageAdmins from "@/components/admin/ManageAdmins";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Manage Admins | Admin Panel",
};

export default async function ManageAdminsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    
    let isSuperAdmin = false;
    
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026");
            const { payload } = await jwtVerify(token, secret);
            if (payload && payload.role === "super_admin") {
                isSuperAdmin = true;
            }
        } catch (e) {
            console.error("JWT Verify Error in ManageAdminsPage", e);
        }
    }

    if (!isSuperAdmin) {
        // Redirect normal admins away
        redirect("/admin/dashboard");
    }

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Administrators</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Add or remove system access for staff.</p>
            </div>

            <ManageAdmins />
        </div>
    );
}
