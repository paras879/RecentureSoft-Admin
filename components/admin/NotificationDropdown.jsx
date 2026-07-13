"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Briefcase, Calendar, Mail, CheckCircle2, Trash2, CheckCheck, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { markNotificationAsRead } from "@/app/admin/actions";

const playNotificationSound = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        // A pleasant two-tone "ding" effect
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch(e) {
        console.log("Audio playback blocked by browser", e);
    }
};

export default function NotificationDropdown({ initialNotifications, initialTotalCount }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const [filterUnread, setFilterUnread] = useState(false);
    const dropdownRef = useRef(null);
    const prevCountRef = useRef(initialTotalCount);
    const router = useRouter();

    // Play sound when new notification arrives
    useEffect(() => {
        if (totalCount > prevCountRef.current) {
            playNotificationSound();
        }
        prevCountRef.current = totalCount;
    }, [totalCount]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch notifications on mount and setup polling
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Add timestamp to prevent browser caching
                const res = await fetch(`/api/admin/notifications?t=${Date.now()}`);
                const data = await res.json();
                if (data.success) {
                    setNotifications(prev => {
                        // Prevent unnecessary re-renders if nothing changed
                        if (JSON.stringify(prev) !== JSON.stringify(data.notifications)) {
                            return data.notifications;
                        }
                        return prev;
                    });
                    setTotalCount(data.totalCount);
                }
            } catch(e) {
                console.error("Fetch error", e);
            }
        };

        // Fetch immediately
        fetchNotifications();

        // Setup polling every 15 seconds for real-time updates
        const intervalId = setInterval(fetchNotifications, 15000);

        return () => clearInterval(intervalId);
    }, []);

    const handleNotificationClick = async (notification) => {
        // Optimistically update UI to remove it
        setNotifications(prev => prev.filter(n => n._id !== notification._id));
        setTotalCount(prev => Math.max(0, prev - 1));
        
        // Mark as read in Database
        await markNotificationAsRead(notification.type, notification._id);
        
        // Close dropdown and navigate
        setIsOpen(false);
        router.push(notification.link);
    };

    const handleDeleteClick = async (e, notification) => {
        e.stopPropagation();
        
        // Optimistically update UI to remove it
        setNotifications(prev => prev.filter(n => n._id !== notification._id));
        setTotalCount(prev => Math.max(0, prev - 1));
        
        // Mark as read in Database so it doesn't show again
        await markNotificationAsRead(notification.type, notification._id);
    };

    const handleMarkAllRead = async () => {
        // Mark all as read optimistically
        const allNotifs = [...notifications];
        setNotifications([]);
        setTotalCount(0);

        // Send requests to mark all as read
        for (const notif of allNotifs) {
            await markNotificationAsRead(notif.type, notif._id);
        }
    };

    const getIcon = (type) => {
        if (type === "project") return <Briefcase className="w-4 h-4 text-blue-500" />;
        if (type === "meeting") return <Calendar className="w-4 h-4 text-purple-500" />;
        return <Mail className="w-4 h-4 text-emerald-500" />;
    };

    const getBg = (type) => {
        if (type === "project") return "bg-blue-100 dark:bg-blue-500/20";
        if (type === "meeting") return "bg-purple-100 dark:bg-purple-500/20";
        return "bg-emerald-100 dark:bg-emerald-500/20";
    };

    const displayedNotifications = filterUnread ? notifications.slice(0, totalCount) : notifications;

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2.5 border rounded-xl transition-colors group ${isOpen ? 'bg-slate-50 dark:bg-white/5 border-cyan-500/50' : 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}`}
            >
                <Bell className={`w-5 h-5 transition-colors ${isOpen ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'}`} />
                
                {totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-slate-50 dark:border-[#020617] animate-in zoom-in duration-300">
                        {totalCount > 99 ? '99+' : totalCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 md:w-96 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            Notifications
                            {totalCount > 0 && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 rounded-full">
                                    {totalCount} New
                                </span>
                            )}
                        </h3>
                        {notifications.length > 0 && (
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setFilterUnread(!filterUnread)}
                                    className={`p-1.5 rounded-lg transition-colors ${filterUnread ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400' : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                                    title="Toggle Unread Only"
                                >
                                    <Filter className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={handleMarkAllRead}
                                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                                    title="Mark all as read"
                                >
                                    <CheckCheck className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {displayedNotifications.length > 0 ? (
                            <div className="flex flex-col">
                                {displayedNotifications.map((notif) => (
                                    <div 
                                        key={notif._id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-50 dark:border-white/5 last:border-0 transition-colors flex gap-4 items-start group cursor-pointer"
                                    >
                                        <div className={`p-2 rounded-full shrink-0 mt-1 ${getBg(notif.type)}`}>
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex flex-col gap-1 pr-2 flex-1">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                                {notif.message}
                                            </p>
                                            <span className="text-[10px] font-medium text-slate-400 mt-1">
                                                {notif.timeAgo}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={(e) => handleDeleteClick(e, notif)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all shrink-0 opacity-0 group-hover:opacity-100"
                                            title="Dismiss notification"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
                                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">All caught up!</p>
                                    <p className="text-xs text-slate-500 mt-1">{filterUnread ? "No unread notifications right now." : "No notifications right now."}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
