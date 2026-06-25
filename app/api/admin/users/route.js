import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectDB();
        const admins = await Admin.find({}, { password: 0 }).lean();
        return NextResponse.json({ success: true, admins });
    } catch (e) {
        console.error("Error fetching admins:", e);
        return NextResponse.json({ success: false, error: "Failed to fetch admins" }, { status: 500 });
    }
}
