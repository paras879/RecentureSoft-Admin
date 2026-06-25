import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MeetingRequest from "@/models/MeetingRequest";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { name, email, date, time, topic } = body;

        // Validation of required fields
        if (!name || !email || !date || !time || !topic) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill in all required fields.",
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid email address.",
                },
                { status: 400 }
            );
        }

        const meeting = await MeetingRequest.create({
            name,
            email,
            date,
            time,
            topic,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Meeting scheduled successfully! We will send an invite to your email.",
                meeting,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Meeting Schedule API Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while scheduling your meeting. Please try again.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
