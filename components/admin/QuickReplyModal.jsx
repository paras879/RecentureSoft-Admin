"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export default function QuickReplyModal({ isOpen, onClose, recipientEmail, recipientName, type }) {
    const [subject, setSubject] = useState(type === "project" ? `Re: Your Project Inquiry` : `Re: Your Message to RecentureSoft`);
    const [message, setMessage] = useState(`Hi ${recipientName},\n\nThank you for reaching out to us.\n\n`);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSend = async () => {
        if (!message.trim() || !subject.trim()) return alert("Subject and message are required.");
        
        setLoading(true);
        try {
            const res = await fetch("/api/admin/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: recipientEmail, subject, message })
            });
            const data = await res.json();
            
            if (data.success) {
                alert("Email sent successfully!");
                onClose();
            } else {
                alert(data.error || "Failed to send email");
            }
        } catch (error) {
            console.error(error);
            alert("Error sending email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-white/10"
                >
                    <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-white/10">
                        <h3 className="font-semibold text-lg">Quick Reply to {recipientEmail}</h3>
                        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"><X className="w-5 h-5"/></button>
                    </div>
                    
                    <div className="p-4 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input 
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={6}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                            />
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-2">
                        <button onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-medium">Cancel</button>
                        <button 
                            onClick={handleSend}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                            {loading ? "Sending..." : "Send Reply"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
