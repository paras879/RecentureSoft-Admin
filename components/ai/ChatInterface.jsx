"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import MessageBubble from "./MessageBubble";
import AIAvatar from "./AIAvatar";

const FLOWS = {
    home: {
        message: "How else can we help you today?",
        options: [
            { label: "Website Development", value: "web" },
            { label: "Mobile App Development", value: "mobile" },
            { label: "AI Solutions", value: "ai" },
            { label: "Cloud Services", value: "cloud" },
            { label: "UI/UX Design", value: "design" },
            { label: "Project Cost Estimation", value: "cost" },
            { label: "Talk to Sales", value: "sales" }
        ]
    },
    web: {
        message: "Great! What type of website are you looking to build?",
        options: [
            { label: "E-Commerce", next: "budget" },
            { label: "Corporate Site", next: "budget" },
            { label: "Web Application (SaaS)", next: "budget" },
            { label: "Not sure yet", next: "budget" }
        ]
    },
    mobile: {
        message: "Awesome. Which platform are you targeting?",
        options: [
            { label: "iOS (Apple)", next: "budget" },
            { label: "Android", next: "budget" },
            { label: "Cross-platform (Both)", next: "budget" }
        ]
    },
    ai: {
        message: "AI is our specialty. What is your primary goal?",
        options: [
            { label: "Automate Workflows", next: "budget" },
            { label: "Custom Chatbot", next: "budget" },
            { label: "Predictive Analytics", next: "budget" },
            { label: "Need Advice", next: "sales" }
        ]
    },
    budget: {
        message: "To give you the best recommendation, what is your estimated budget?",
        options: [
            { label: "< $10k", next: "timeline" },
            { label: "$10k - $50k", next: "timeline" },
            { label: "$50k+", next: "timeline" },
            { label: "Not sure", next: "timeline" }
        ]
    },
    timeline: {
        message: "Got it. When do you need this completed?",
        options: [
            { label: "ASAP", next: "sales" },
            { label: "1-3 Months", next: "sales" },
            { label: "3-6 Months", next: "sales" },
            { label: "Just researching", next: "sales" }
        ]
    },
    sales: {
        message: "Perfect. Let's get you connected with our senior technical team to discuss the exact requirements.",
        options: [
            { label: "Schedule Meeting", next: "handoff" },
            { label: "Request Proposal", next: "handoff" },
            { label: "Contact Team", next: "handoff" }
        ]
    },
    handoff: {
        message: "Thank you! Please provide your Name, Email address, and Contact number so our team can reach out to you directly.",
        options: [] // Expecting text input here
    }
};

const WELCOME_SUGGESTIONS = [
    { label: "Analyze Website", icon: "🔍" },
    { label: "Improve UI", icon: "✨" },
    { label: "Generate Content", icon: "📝" },
    { label: "Fix Bugs", icon: "🐛" },
    { label: "SEO Audit", icon: "📈" },
    { label: "Performance Audit", icon: "⚡" },
    { label: "Create Landing Page", icon: "🚀" },
    { label: "Generate Code", icon: "💻" }
];

export default function ChatInterface({ onClose, isMinimized }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("Widget mounted");
        return () => console.log("Widget unmounted");
    }, []);

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const sessionIdRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, []);

    useEffect(() => {
        if (!isMinimized) scrollToBottom();
    }, [messages, isStreaming, isMinimized, scrollToBottom]);

    useEffect(() => {
        let sessionId = localStorage.getItem("recenture_chat_session");

        if (!sessionId) {
            sessionId = crypto.randomUUID();
            localStorage.setItem("recenture_chat_session", sessionId);
        }

        sessionIdRef.current = sessionId;
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("recenture_ai_chat_history");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                console.log("Widget hydrated with messages:", parsed);
                setMessages(parsed);
            } catch {
                console.error("Failed to parse chat history");
            }
        }
        setIsLoaded(true);
        console.log("Provider initialized (isLoaded set to true)");
    }, []);

    useEffect(() => {
        if (isLoaded && messages.length > 0) {
            localStorage.setItem("recenture_ai_chat_history", JSON.stringify(messages));
            
            // Sync chat history to database silently
            const timeoutId = setTimeout(() => {
                fetch("/api/chat/sync", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        sessionId: sessionIdRef.current,
                        messages: messages.map(m => ({ role: m.role, content: m.content }))
                    })
                }).catch(err => console.error("Chat sync failed", err));
            }, 1000);
            
            return () => clearTimeout(timeoutId);
        }
    }, [messages, isLoaded]);

    const adjustTextareaHeight = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, []);

    useEffect(() => {
        adjustTextareaHeight();
        console.log("Input state changed:", input);
    }, [input, adjustTextareaHeight]);

    const startNewChat = () => {
        setMessages([]);
        setIsStreaming(false);
        setInput("");
        if (typeof window !== "undefined") {
            localStorage.removeItem("recenture_ai_chat_history");
        }
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 100);
    };

    const triggerFlow = (flowId, userText) => {
        if (userText) {
            setMessages(prev => [...prev, { role: "user", content: userText }]);
        }

        setTimeout(() => {
            const flow = FLOWS[flowId];
            if (flow) {
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: flow.message,
                    options: flow.options
                }]);
            }
        }, 500);
    };

    const handleOptionSelect = useCallback((option) => {
        if (option.value && FLOWS[option.value]) {
            triggerFlow(option.value, option.label);
        } else if (option.next && FLOWS[option.next]) {
            triggerFlow(option.next, option.label);
        } else {
            handleSend(option.label);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const routeIntent = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes("website") || lower.includes("web")) return "web";
        if (lower.includes("app") || lower.includes("mobile") || lower.includes("ios")) return "mobile";
        if (lower.includes("ai") || lower.includes("bot")) return "ai";
        if (lower.includes("cost") || lower.includes("price") || lower.includes("budget")) return "budget";
        if (lower.includes("talk") || lower.includes("human") || lower.includes("sales")) return "sales";
        return null;
    };

    const handleSend = async (text = input) => {
        console.log("Send button clicked. Text:", text);
        if (!text.trim() || isStreaming) return;

        console.log("Send handler attached and executing...");
        const userMsg = { role: "user", content: text };
        setMessages(prev => [...prev, userMsg]);

        setInput("");

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.focus();
        }

        const lastMsg = messages[messages.length - 1];
        if (lastMsg && (lastMsg.content.includes("email address") || lastMsg.content.includes("Contact number"))) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: "Got it. Our team will contact you shortly with these details. Is there anything else you'd like to add regarding your requirements?",
                    options: [{ label: "No, that's all", next: "home" }]
                }]);
            }, 600);
            return;
        }

        const intent = routeIntent(text);
        if (intent) {
            triggerFlow(intent);
            return;
        }

        setIsStreaming(true);
        const newMessages = [...messages, userMsg];
        // We DO NOT append an empty assistant message here. 
        // This ensures the last message is still 'user', so the 'Typing...' animation shows.

        try {
            console.log("API request started");
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: sessionIdRef.current,
                    messages: newMessages.map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                })
            });

            if (!response.ok) {
                console.log("Error state triggered: !response.ok");
                let errorMessage = "I'm currently unable to connect. Please try again or talk to sales.";
                try {
                    const errorJson = await response.json();
                    if (errorJson && errorJson.error) {
                        errorMessage = errorJson.error;
                    }
                } catch {
                    // Ignore JSON parsing errors
                }
                const error = new Error(errorMessage);
                error.status = response.status;
                throw error;
            }

            console.log("API response received");
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let aiText = "";

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunkValue = decoder.decode(value, { stream: true });
                    aiText += chunkValue;

                    setMessages(prev => {
                        const latest = [...prev];
                        if (latest.length > 0 && latest[latest.length - 1].role === "user") {
                            // First chunk: add the assistant message
                            latest.push({ role: "assistant", content: aiText });
                        } else {
                            // Subsequent chunks: update the assistant message
                            latest[latest.length - 1] = { ...latest[latest.length - 1], content: aiText };
                        }
                        return latest;
                    });
                }
            }

            setMessages(prev => {
                const latest = [...prev];
                latest[latest.length - 1].options = [
                    { label: "Book Consultation", next: "sales" },
                    { label: "Estimate Cost", next: "budget" }
                ];
                return latest;
            });

        } catch (error) {
            console.error("Chat Error:", error);
            console.log("Error state triggered in catch block");
            setMessages(prev => {
                const latest = [...prev];
                latest[latest.length - 1].content = error.message || "I'm currently unable to connect. Please try again or talk to sales.";
                latest[latest.length - 1].options = [{ label: "Talk to Sales", next: "sales" }];
                return latest;
            });
        } finally {
            setIsStreaming(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.label);
        textareaRef.current?.focus();
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-gray-200 transition-colors duration-300 relative font-sans overflow-hidden rounded-t-3xl md:rounded-3xl">

            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:py-4 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <button
                        onClick={onClose}
                        aria-label="Close chat"
                        className="p-1.5 -ml-1.5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center relative bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0f172a] dark:to-[#020617] border border-slate-200 dark:border-white/10 shadow-inner">
                            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[2px]" />
                            <AIAvatar isThinking={isStreaming} />
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-bold text-[15px] tracking-wide leading-tight">Recenture AI</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 tracking-wider font-semibold">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={startNewChat}
                        aria-label="Restart conversation"
                        className="p-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all active:scale-95"
                        title="Restart"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            {!isMinimized && (
                <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {isLoaded && messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] mb-3 md:mb-6 shadow-[0_0_30px_rgba(8,145,178,0.3)]">
                                <div className="w-full h-full bg-white dark:bg-[#0b1120] rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 md:w-8 md:h-8 text-cyan-500 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                        <line x1="12" x2="12" y1="19" y2="22" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 mb-0.5 md:mb-2 text-center">AI Assistant</h2>
                            <p className="text-[11px] md:text-sm font-medium text-slate-500 dark:text-slate-400 text-center mb-3 md:mb-8">Ask anything about this platform</p>

                            <div className="flex flex-wrap justify-center gap-1 md:gap-3 max-w-[100%] px-1 md:px-0">
                                {WELCOME_SUGGESTIONS.map((s, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(s)}
                                        className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2.5 rounded-xl bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50 hover:shadow-md text-[10px] md:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <span className="text-base">{s.icon}</span>
                                        <span>{s.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 max-w-3xl mx-auto w-full pb-36">
                            {messages.map((msg, idx) => (
                                <MessageBubble
                                    key={idx}
                                    message={msg}
                                    isLatest={idx === messages.length - 1}
                                    onOptionSelect={handleOptionSelect}
                                />
                            ))}
                            {isStreaming && messages.length > 0 && messages[messages.length - 1].role === "user" && (
                                <div className="flex flex-col items-start w-full mb-6 md:mb-8">
                                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl p-3 md:p-4 rounded-tl-sm shadow-sm dark:shadow-none backdrop-blur-sm">
                                        <div className="flex gap-1.5 h-4 items-center">
                                            <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-6" />
                        </div>
                    )}
                </div>
            )}

            {/* Input Area */}
            {!isMinimized && (
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-white via-white dark:from-[#020617] dark:via-[#020617] to-transparent pt-8 md:pt-10 z-10">
                    <div className="max-w-3xl mx-auto relative">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-end bg-white dark:bg-[#0f172a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all"
                        >
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask anything... (Shift+Enter for new line)"
                                className="flex-1 bg-transparent text-slate-800 dark:text-gray-100 text-[12px] md:text-[15px] px-3 py-2.5 md:px-5 md:py-4 resize-none focus:outline-none max-h-32 min-h-[44px] md:min-h-[56px] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10"
                                rows={1}
                                aria-label="Chat input"
                            />

                            <div className="flex items-center px-1.5 py-1.5 shrink-0 h-[44px] md:h-[56px] self-end">
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isStreaming}
                                    aria-label="Send message"
                                    className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white disabled:opacity-50 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-700 dark:disabled:to-slate-800 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all shadow-md group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 dark:focus:ring-offset-[#0f172a]"
                                >
                                    {isStreaming ? (
                                        <svg className="animate-spin w-4 h-4 md:w-5 md:h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
