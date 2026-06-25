import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";
import ChatHistory from "@/components/admin/ChatHistory";

export const metadata = {
    title: "AI Chat History | Admin Dashboard",
    description: "View logs of user interactions with the AI chatbot.",
};

export const dynamic = "force-dynamic";

export default async function ChatsPage() {
    await connectDB();
    
    // Fetch all chats sorted by lastSeen descending
    const rawChats = await Chat.find({})
        .sort({ lastSeen: -1 })
        .lean();

    // Serialize object ids for client component
    const chats = rawChats.map(chat => ({
        ...chat,
        _id: chat._id.toString(),
        createdAt: chat.createdAt?.toISOString(),
        updatedAt: chat.updatedAt?.toISOString(),
        firstSeen: chat.firstSeen?.toISOString(),
        lastSeen: chat.lastSeen?.toISOString(),
        messages: chat.messages.map(msg => ({
            ...msg,
            _id: msg._id?.toString(),
            timestamp: msg.timestamp?.toISOString(),
        }))
    }));

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        AI Chatbot History
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Review past conversations visitors had with Recenture AI.
                    </p>
                </div>
            </div>

            <ChatHistory chats={chats} />
        </div>
    );
}
