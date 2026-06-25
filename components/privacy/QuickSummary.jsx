import React from 'react';
import { ShieldCheck, EyeOff, FileKey, RefreshCcw } from 'lucide-react';

const summaries = [
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description: "Your data is encrypted at rest and in transit using industry-standard protocols.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    icon: EyeOff,
    title: "We Don't Sell Data",
    description: "Your personal information is never sold to third parties or data brokers.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: FileKey,
    title: "You're in Control",
    description: "Export, delete, or modify your data at any time through your account settings.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    icon: RefreshCcw,
    title: "Transparent Updates",
    description: "We'll always notify you clearly before making material changes to this policy.",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  }
];

export default function QuickSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes qsFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .qs-fade-in {
          animation: qsFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}} />
      {summaries.map((item, index) => (
        <div
          key={index}
          className="qs-fade-in p-6 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-colors"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg}`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
