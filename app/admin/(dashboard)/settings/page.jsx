import SettingsTabs from "@/components/admin/SettingsTabs";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const metadata = {
    title: "Settings | Admin Panel",
};

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    let currentUsername = "Admin";
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026");
            const { payload } = await jwtVerify(token, secret);
            if (payload && payload.username) {
                currentUsername = payload.username;
            }
        } catch (e) {
            console.error("JWT Verify Error in SettingsPage", e);
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your account and website preferences</p>
            </div>

            <SettingsTabs currentUsername={currentUsername} />
        </div>
    );
}
