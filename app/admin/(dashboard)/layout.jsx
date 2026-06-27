import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
    title: "Admin Portal | RecentureSoft",
    description: "Secure admin dashboard.",
};

export default async function DashboardLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        redirect("/admin/login");
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                <AdminHeader />
                {children}
            </main>
        </div>
    );
}
