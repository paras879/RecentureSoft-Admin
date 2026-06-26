import { NextResponse } from "next/server";

// Server-side Cloudinary upload — avoids browser CORS/auth issues entirely
export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const cloudName = "dgsebwvvs";
        const uploadPreset = "recenturesoft_upload";

        console.log(`[Upload] Using cloud: ${cloudName}, preset: ${uploadPreset}`);
        console.log(`[Upload] File name: ${file.name}, size: ${file.size}, type: ${file.type}`);

        // Build upload form for Cloudinary
        const cloudinaryForm = new FormData();
        cloudinaryForm.append("file", file);
        cloudinaryForm.append("upload_preset", uploadPreset);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        console.log(`[Upload] Posting to: ${cloudinaryUrl}`);

        const res = await fetch(cloudinaryUrl, {
            method: "POST",
            body: cloudinaryForm,
        });

        const data = await res.json();
        console.log(`[Upload] Cloudinary response status: ${res.status}`);

        if (data.secure_url) {
            console.log(`[Upload] SUCCESS: ${data.secure_url}`);
            return NextResponse.json({ secure_url: data.secure_url });
        } else {
            console.error("[Upload] Cloudinary error:", JSON.stringify(data));
            return NextResponse.json(
                { error: data.error?.message || "Cloudinary upload failed" },
                { status: 400 }
            );
        }
    } catch (err) {
        console.error("[Upload] Server error:", err);
        return NextResponse.json({ error: "Server error during upload: " + err.message }, { status: 500 });
    }
}
