import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";

export async function POST(req) {
    try {
        const body = await req.json();
        const { sessionId, messages } = body;
        
        if (!sessionId || !messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        await connectDB();
        
        const keywords = ["website", "app", "software", "ai", "crm", "ecommerce", "seo", "marketing", "contact", "email"];
        const checkText = messages.map(m => m.content).join(" ").toLowerCase();
        const hasKeywords = keywords.some(kw => checkText.includes(kw));
        
        const existingChat = await Chat.findOne({ sessionId });
        let leadStatus = existingChat && existingChat.leadStatus === "hot" ? "hot" : (hasKeywords ? "hot" : "cold");
        
        const now = new Date();
        const firstSeen = existingChat ? (existingChat.firstSeen || now) : now;
        
        await Chat.findOneAndUpdate(
            { sessionId },
            {
                sessionId,
                messages,
                totalMessages: messages.length,
                firstSeen,
                lastSeen: now,
                leadStatus
            },
            { upsert: true, new: true }
        );
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Chat sync error:", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}
