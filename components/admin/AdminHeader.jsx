import { Search } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import Contact from "@/models/Contact";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "@/components/ThemeToggle";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Helper function to format time ago
const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

export default async function AdminHeader() {
    await connectDB();
    
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
            console.error("JWT Verify Error in AdminHeader", e);
        }
    }
    
    // Fallback to 0 if count fails, just in case a model is missing the status field initially
    let newProjects = [];
    let newMeetings = [];
    let newContacts = [];

    try {
        newProjects = await ProjectInquiry.find({ status: "new" }).sort({ createdAt: -1 }).limit(5).lean().catch(() => []);
        newMeetings = await MeetingRequest.find({ status: "new" }).sort({ createdAt: -1 }).limit(5).lean().catch(() => []);
        newContacts = await Contact.find({ status: "new" }).sort({ createdAt: -1 }).limit(5).lean().catch(() => []);
    } catch (e) {
        console.error("Error fetching notification counts", e);
    }
    
    // Combine and sort all notifications
    const allNotifications = [
        ...newProjects.map(n => ({
            _id: n._id.toString(),
            type: "project",
            title: `New Project Inquiry: ${n.name}`,
            message: n.projectDetails || n.message || "No details provided.",
            timeAgo: n.createdAt ? timeAgo(new Date(n.createdAt)) : "recently",
            createdAt: n.createdAt || new Date(),
            link: "/admin/projects"
        })),
        ...newMeetings.map(n => ({
            _id: n._id.toString(),
            type: "meeting",
            title: `New Meeting Request: ${n.name}`,
            message: n.subject || n.message || "No details provided.",
            timeAgo: n.createdAt ? timeAgo(new Date(n.createdAt)) : "recently",
            createdAt: n.createdAt || new Date(),
            link: "/admin/meetings"
        })),
        ...newContacts.map(n => ({
            _id: n._id.toString(),
            type: "contact",
            title: `New Message: ${n.name}`,
            message: n.message || "No details provided.",
            timeAgo: n.createdAt ? timeAgo(new Date(n.createdAt)) : "recently",
            createdAt: n.createdAt || new Date(),
            link: "/admin/leads"
        }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    const totalNotifications = allNotifications.length;

    return (
        <header className="w-full flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-white/10">
            {/* Search Bar */}
            <div className="relative w-full max-w-md hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                    type="text"
                    placeholder="Search anything..."
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm transition-all"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-auto">
                
                {/* Theme Toggle Component */}
                <ThemeToggle />

                {/* Notification Dropdown Component */}
                <NotificationDropdown 
                    initialNotifications={allNotifications} 
                    initialTotalCount={totalNotifications} 
                />

                {/* Admin Profile Dropdown Component */}
                <ProfileDropdown currentUsername={currentUsername} />

            </div>
        </header>
    );
}
