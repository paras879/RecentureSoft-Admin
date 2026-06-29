import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("file");

    if (!fileUrl) {
        return new NextResponse("File URL not provided", { status: 400 });
    }

    try {
        // Construct the absolute path to the file in the Frontend's public folder
        const fileName = fileUrl.split('/').pop();
        const filePath = path.join("C:\\Users\\Paras Tomar\\OneDrive\\Desktop\\RecentureSoft\\public\\uploads\\resumes", fileName);
        
        const fileBuffer = await fs.readFile(filePath);

        // Determine content type
        const ext = fileName.split('.').pop().toLowerCase();
        let contentType = "application/pdf";
        if (ext === "doc") contentType = "application/msword";
        if (ext === "docx") contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        if (["jpg", "jpeg", "png"].includes(ext)) contentType = `image/${ext}`;

        const headers = new Headers();
        headers.set("Content-Type", contentType);
        headers.set("Content-Disposition", `attachment; filename="${fileName}"`);

        return new NextResponse(fileBuffer, { status: 200, headers });
    } catch (error) {
        console.error("Error downloading file:", error);
        return new NextResponse("File not found or error occurred", { status: 404 });
    }
}
