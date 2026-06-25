import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import Contact from "@/models/Contact";
import Chat from "@/models/Chat";

const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
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

export async function GET() {
    try {
        await connectDB();
        
        const [newProjects, newMeetings, newContacts, newChats] = await Promise.all([
            ProjectInquiry.find({ status: { $ne: "read" } }).sort({ createdAt: -1 }).limit(10).lean().catch(() => []),
            MeetingRequest.find({ status: { $ne: "read" } }).sort({ createdAt: -1 }).limit(10).lean().catch(() => []),
            Contact.find({ status: { $ne: "read" } }).sort({ createdAt: -1 }).limit(10).lean().catch(() => []),
            Chat.find({ leadStatus: "hot", status: { $ne: "read" } }).sort({ updatedAt: -1 }).limit(10).lean().catch(() => [])
        ]);
        
        const allNotifications = [
            ...newProjects.map(n => ({
                _id: n._id.toString(), type: "project",
                title: `New Project Inquiry: ${n.name}`,
                message: n.projectDetails || n.message || "No details provided.",
                timeAgo: n.createdAt ? timeAgo(n.createdAt) : "recently",
                createdAt: n.createdAt || new Date(),
                link: "/admin/projects"
            })),
            ...newMeetings.map(n => ({
                _id: n._id.toString(), type: "meeting",
                title: `New Meeting Request: ${n.name}`,
                message: n.subject || n.message || "No details provided.",
                timeAgo: n.createdAt ? timeAgo(n.createdAt) : "recently",
                createdAt: n.createdAt || new Date(),
                link: "/admin/meetings"
            })),
            ...newContacts.map(n => ({
                _id: n._id.toString(), type: "contact",
                title: `New Message: ${n.name}`,
                message: n.message || "No details provided.",
                timeAgo: n.createdAt ? timeAgo(n.createdAt) : "recently",
                createdAt: n.createdAt || new Date(),
                link: "/admin/leads"
            })),
            ...newChats.map(n => ({
                _id: n._id.toString(), type: "chat",
                title: `Hot Chat Lead`,
                message: `A new hot lead was identified in AI Chat.`,
                timeAgo: n.updatedAt ? timeAgo(n.updatedAt) : "recently",
                createdAt: n.updatedAt || new Date(),
                link: "/admin/chats"
            }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

        return NextResponse.json({ success: true, notifications: allNotifications, totalCount: allNotifications.length });
    } catch (e) {
        console.error("Notifications API Error", e);
        return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 });
    }
}
