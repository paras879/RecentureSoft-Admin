"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBubble = memo(({ message, isLatest, onOptionSelect }) => {
    const isAi = message.role === "assistant";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col w-full ${isAi ? "items-start" : "items-end"} mb-4 md:mb-5 group`}
        >
            <div
                className={`
                    max-w-[88%] sm:max-w-[82%] md:max-w-[75%] lg:max-w-[68%] xl:max-w-[62%] text-[14.5px] md:text-[15px] font-normal relative
                    ${isAi
                        ? "text-slate-800 dark:text-gray-100"
                        : "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl px-4 py-2.5 md:px-5 md:py-3 shadow-md rounded-tr-sm"}
                `}
            >
                {isAi ? (
                    <div className="break-words overflow-hidden bg-white/95 dark:bg-[#0f172a]/95 border border-slate-200 dark:border-white/5 rounded-[22px] rounded-tl-md p-3.5 sm:p-4 md:p-5 rounded-tl-sm shadow-lg shadow-slate-200/50 dark:shadow-black/30 backdrop-blur-md transition-all">
                        <div className="prose dark:prose-invert prose-sm md:prose-base leading-7 break-words max-w-none leading-relaxed prose-p:my-1.5 prose-a:text-cyan-500 hover:prose-a:text-cyan-400">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                            {isLatest && !message.content && (
                                <div className="flex gap-1.5 mt-2 h-4 items-center">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            )}
                        </div>

                        {/* Copy Button (only shows on hover) */}
                        {message.content && (
                            <button
                                onClick={handleCopy}
                                aria-label="Copy response"
                                className={`absolute -right-2 -top-2 p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 ${copied ? 'text-green-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                {copied ? (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="leading-relaxed">{message.content}</p>
                )}
            </div>

            {/* Render Guided Options if present */}
            {isAi && isLatest && message.options && message.options.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 md:gap-2.5 mt-3 md:mt-4 ml-1 md:ml-2"
                >
                    {message.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => onOptionSelect(opt)}
                            className="px-3.5 py-2 md:px-4 md:py-2.5 bg-white hover:bg-slate-50 dark:bg-[#0f172a] dark:hover:bg-[#1e293b] border border-cyan-500/30 hover:border-cyan-400/80 rounded-xl text-[13px] md:text-[14px] font-semibold text-cyan-700 dark:text-cyan-400 transition-all shadow-sm hover:shadow-md flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {opt.label}
                            <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
});

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;
