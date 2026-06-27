import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function DELETE(request: Request, { params }: any) {
    try {
        await connectDB();
        const { id } = await params;
        
        await TeamMember.findByIdAndDelete(id);
        
        return NextResponse.json({ message: "Team member deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: any) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        
        const updatedMember = await TeamMember.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(updatedMember, { status: 200 });
    } catch (error) {
        console.error("Error updating team member:", error);
        return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
    }
}
