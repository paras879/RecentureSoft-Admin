import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import ActivityLog from "@/models/ActivityLog";
import Blog from "@/models/Blog";
import { getAdminRole, logAdminActivity } from "@/lib/adminUtils";

export async function DELETE(request) {
    try {
        await connectDB();
        
        await getAdminRole(); // Verify token without assigning role

        const body = await request.json();
        const { type, ids } = body;

        if (!ids || !Array.isArray(ids) || !type) {
            return NextResponse.json(
                { success: false, error: "Type and array of IDs are required" },
                { status: 400 }
            );
        }

        let result = null;

        switch (type) {
            case "contact":
                result = await Contact.deleteMany({ _id: { $in: ids } });
                break;
            case "project":
                result = await ProjectInquiry.deleteMany({ _id: { $in: ids } });
                break;
            case "meeting":
                result = await MeetingRequest.deleteMany({ _id: { $in: ids } });
                break;
            case "activity":
                result = await ActivityLog.deleteMany({ _id: { $in: ids } });
                break;
            case "blog":
                result = await Blog.deleteMany({ _id: { $in: ids } });
                break;
            case "portfolio":
                const Portfolio = (await import("@/models/Portfolio")).default;
                result = await Portfolio.deleteMany({ _id: { $in: ids } });
                break;
            case "service":
                const Service = (await import("@/models/Service")).default;
                result = await Service.deleteMany({ _id: { $in: ids } });
                break;
            default:
                return NextResponse.json(
                    { success: false, error: "Invalid record type" },
                    { status: 400 }
                );
        }

        if (type !== "activity") {
            await logAdminActivity(
                'DELETE',
                type.charAt(0).toUpperCase() + type.slice(1),
                `Bulk deleted ${result.deletedCount} ${type} records`
            );
        }

        return NextResponse.json({ success: true, message: `Successfully deleted ${result.deletedCount} records` });
    } catch (error) {
        console.error("Error bulk deleting records:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete records" },
            { status: 500 }
        );
    }
}
