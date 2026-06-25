import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EventGallery from "@/models/EventGallery";
import { resolveImagePath } from "@/lib/imageHelper";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        const yearStr = searchParams.get("year");

        if (!slug) {
            return NextResponse.json(
                { error: "Missing required parameter: slug" },
                { status: 400 }
            );
        }

        // If year is provided, return all gallery images for that year and slug
        if (yearStr) {
            const year = parseInt(yearStr, 10);
            if (isNaN(year)) {
                return NextResponse.json(
                    { error: "Invalid year parameter" },
                    { status: 400 }
                );
            }

            const images = await EventGallery.find({
                eventSlug: new RegExp(`^${slug}$`, "i"),
                year: year,
            }).sort({ order: 1 });

            // Apply resolveImagePath to all images
            const resolvedImages = images.map((doc: any) => {
                const obj = doc.toObject ? doc.toObject() : { ...doc };
                return {
                    ...obj,
                    image: resolveImagePath(obj.image),
                };
            });

            return NextResponse.json(resolvedImages);
        }

        // If year is NOT provided, return distinct years for that event slug
        const years = await EventGallery.distinct("year", { eventSlug: new RegExp(`^${slug}$`, "i") });
        
        // Sort years in descending order
        const sortedYears = [...years].sort((a: any, b: any) => Number(b) - Number(a));

        return NextResponse.json(sortedYears);
    } catch (error: any) {
        console.error("Gallery API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
