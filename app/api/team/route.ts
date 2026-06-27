import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET() {
    try {
        await connectDB();
        const team = await TeamMember.find().sort({ _id: -1 });
        return NextResponse.json(team);
    } catch (error) {
        console.error("Error fetching team members:", error);
        return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        
        const newMember = await TeamMember.create(body);
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        console.error("Error creating team member:", error);
        return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
    }
}
