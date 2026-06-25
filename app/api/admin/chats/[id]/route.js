import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Chat ID is required" },
                { status: 400 }
            );
        }

        const deletedChat = await Chat.findByIdAndDelete(id);

        if (!deletedChat) {
            return NextResponse.json(
                { success: false, error: "Chat not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Chat deleted successfully" });
    } catch (error) {
        console.error("Error deleting chat:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete chat" },
            { status: 500 }
        );
    }
}
