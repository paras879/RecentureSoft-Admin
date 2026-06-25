import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectInquiry from "@/models/ProjectInquiry";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { name, email, projectType, projectDetails } = body;

        // Validation of required fields
        if (!name || !email || !projectType || !projectDetails) {
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

        const inquiry = await ProjectInquiry.create({
            name,
            email,
            projectType,
            projectDetails,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Your project inquiry has been sent successfully! Our team will contact you soon.",
                inquiry,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Project Inquiry API Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while saving your inquiry. Please try again.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
