import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectInquiry from "@/models/ProjectInquiry";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectDB();
        
        // Fetch all project leads
        const leads = await ProjectInquiry.find().sort({ createdAt: -1 }).lean();

        // Define CSV headers
        const header = ["Name", "Email", "Project Type", "Status", "Date"];
        
        // Map data to CSV rows
        const rows = leads.map(lead => {
            // Escape quotes inside fields by replacing " with ""
            const escapeCSV = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;
            
            return [
                escapeCSV(lead.name),
                escapeCSV(lead.email),
                escapeCSV(lead.projectType),
                escapeCSV(lead.status || 'new'),
                escapeCSV(new Date(lead.createdAt).toLocaleDateString("en-IN", { timeZone: 'Asia/Kolkata' }))
            ];
        });

        // Combine header and rows
        const csvContent = [header.join(","), ...rows.map(r => r.join(","))].join("\n");

        // Return as a downloadable file
        const response = new NextResponse(csvContent);
        response.headers.set("Content-Type", "text/csv");
        response.headers.set("Content-Disposition", 'attachment; filename="project_leads.csv"');

        return response;
    } catch (error) {
        console.error("Export CSV Error:", error);
        return new NextResponse("Failed to export data", { status: 500 });
    }
}
