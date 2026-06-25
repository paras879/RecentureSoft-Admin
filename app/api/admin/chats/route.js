import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";

// Enforce dynamic behavior to prevent static output caching
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        
        // Fetch all conversations sorted by latest activity (lastSeen descending)
        const chats = await Chat.find({}).sort({ lastSeen: -1 });
        
        return new Response(JSON.stringify({ chats }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, max-age=0"
            }
        });
    } catch (error) {
        console.error("[Admin API] Failed to fetch conversations:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch conversations" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
