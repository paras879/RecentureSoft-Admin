import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import ActivityLog from "@/models/ActivityLog";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        
        const { type, id } = await params;

        if (!id || !type) {
            return NextResponse.json(
                { success: false, error: "Type and ID are required" },
                { status: 400 }
            );
        }

        const { getAdminRole } = await import("@/lib/adminUtils");
        await getAdminRole(); // Still calling just to verify token but not assigning to role

        let deletedRecord = null;

        switch (type) {
            case "contact":
                deletedRecord = await Contact.findByIdAndDelete(id);
                break;
            case "project":
                deletedRecord = await ProjectInquiry.findByIdAndDelete(id);
                break;
            case "meeting":
                deletedRecord = await MeetingRequest.findByIdAndDelete(id);
                break;
            case "portfolio":
                const Portfolio = (await import("@/models/Portfolio")).default;
                deletedRecord = await Portfolio.findByIdAndDelete(id);
                break;
            case "service":
                const Service = (await import("@/models/Service")).default;
                deletedRecord = await Service.findByIdAndDelete(id);
                break;
            case "activity":
                deletedRecord = await ActivityLog.findByIdAndDelete(id);
                break;
            default:
                return NextResponse.json(
                    { success: false, error: "Invalid record type" },
                    { status: 400 }
                );
        }

        if (!deletedRecord) {
            return NextResponse.json(
                { success: false, error: "Record not found" },
                { status: 404 }
            );
        }

        if (type !== "activity") {
            const { logAdminActivity } = await import("@/lib/adminUtils");
            await logAdminActivity(
                'DELETE',
                type.charAt(0).toUpperCase() + type.slice(1),
                `Deleted ${type} record with ID ${id}`
            );
        }

        return NextResponse.json({ success: true, message: "Record deleted successfully" });
    } catch (error) {
        console.error("Error deleting record:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete record" },
            { status: 500 }
        );
    }
}
