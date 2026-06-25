"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MessageSquare, Clock, User, Bot, LayoutList, Flame, Snowflake, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatHistory({ chats }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChat, setSelectedChat] = useState(chats.length > 0 ? chats[0] : null);
    const [isDeleting, setIsDeleting] = useState(false);
    const messagesEndRef = useRef(null);

    // Filter chats based on search
    const filteredChats = chats.filter(chat => 
        chat.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.messages.some(m => m.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Auto scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedChat]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
        });
    };

    const handleDeleteChat = async (chatId, e) => {
        e.stopPropagation(); // Prevent selecting the chat when clicking delete
        if (!window.confirm("Are you sure you want to delete this chat session? This action cannot be undone.")) return;
        
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/chats/${chatId}`, {
                method: "DELETE",
            });
            
            if (res.ok) {
                if (selectedChat?._id === chatId) {
                    setSelectedChat(null);
                }
                router.refresh(); // Refresh the server component to get updated data
            } else {
                alert("Failed to delete chat");
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
            alert("An error occurred while deleting the chat");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            
            {/* Left Panel: Chat List */}
            <div className="w-full lg:w-1/3 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm flex flex-col overflow-hidden h-full">
                
                {/* Search Header */}
                <div className="p-4 border-b border-slate-200 dark:border-white/10 shrink-0">
                    <h2 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-cyan-500" />
                        AI Chat Sessions
                        <span className="ml-auto text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
                            {chats.length} Total
                        </span>
                    </h2>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input 
                            type="text"
                            placeholder="Search in chats..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                        />
                    </div>
                </div>

                {/* List of Sessions */}
                <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 custom-scrollbar">
                    {filteredChats.length > 0 ? (
                        filteredChats.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-2 cursor-pointer ${
                                    selectedChat?._id === chat._id 
                                        ? "bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 shadow-sm" 
                                        : "bg-transparent border border-transparent hover:bg-slate-50 dark:hover:bg-white/5"
                                }`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white truncate">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <span className="truncate max-w-[120px]">Visitor</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 flex items-center gap-1 shrink-0">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(chat.lastSeen)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                                        "{chat.messages[0]?.content || "Empty Chat"}"
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {chat.leadStatus === "hot" ? (
                                            <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                        ) : (
                                            <Snowflake className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                        )}
                                        <button 
                                            onClick={(e) => handleDeleteChat(chat._id, e)}
                                            disabled={isDeleting}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10"
                                            title="Delete chat"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center flex flex-col items-center justify-center h-full gap-3 text-slate-500">
                            <LayoutList className="w-8 h-8 opacity-50" />
                            <p className="text-sm">No chats found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Chat Viewer */}
            <div className="w-full lg:w-2/3 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm flex flex-col overflow-hidden h-full relative">
                {selectedChat ? (
                    <>
                        {/* Chat Details Header */}
                        <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-4 shrink-0">
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    Chat Transcript
                                    {selectedChat.leadStatus === "hot" && (
                                        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-full border border-orange-200 dark:border-orange-500/30 uppercase tracking-wider flex items-center gap-1">
                                            <Flame className="w-3 h-3" /> Hot Lead
                                        </span>
                                    )}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                    <span>ID: {selectedChat.sessionId.substring(0, 12)}...</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span>{selectedChat.totalMessages} Messages</span>
                                </p>
                            </div>
                            <button
                                onClick={(e) => handleDeleteChat(selectedChat._id, e)}
                                disabled={isDeleting}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors border border-red-100 dark:border-red-500/20"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete Session</span>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6 custom-scrollbar bg-[url('/grid.svg')] bg-center">
                            {selectedChat.messages.map((msg, idx) => {
                                const isUser = msg.role === "user";
                                return (
                                    <div key={idx} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                                        <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                                            
                                            {/* Avatar */}
                                            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-sm ${
                                                isUser 
                                                    ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" 
                                                    : "bg-gradient-to-tr from-cyan-500 to-blue-500 text-white"
                                            }`}>
                                                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                            </div>

                                            {/* Bubble */}
                                            <div className="flex flex-col gap-1 relative group">
                                                <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${
                                                    isUser 
                                                        ? "bg-indigo-600 text-white rounded-tr-sm" 
                                                        : "bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded-tl-sm"
                                                }`}>
                                                    {msg.content}
                                                </div>
                                                <span className={`text-[10px] text-slate-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                                                    isUser ? "justify-end" : "justify-start"
                                                }`}>
                                                    {formatDate(msg.timestamp)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                            <Bot className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="font-medium text-slate-600 dark:text-slate-400">Select a chat session to view history</p>
                    </div>
                )}
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(148, 163, 184, 0.5);
                }
            `}</style>
        </div>
    );
}
