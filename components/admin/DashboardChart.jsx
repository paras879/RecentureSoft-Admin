"use client";

import { useTheme } from "next-themes";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useEffect, useState } from "react";

export default function DashboardChart({ 
    data: externalData, 
    title = "Analytics Overview", 
    description = "All incoming requests",
    dataKey,
    dataName,
    color = "#0ea5e9"
}) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [fetchedData, setFetchedData] = useState([]);
    const [range, setRange] = useState("7d");
    const [loading, setLoading] = useState(!externalData);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (externalData) {
            setLoading(false);
            return;
        }
        
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/analytics?range=${range}`);
                const json = await res.json();
                if (json.success) setFetchedData(json.chartData);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [range, externalData]);

    if (!mounted) {
        return <div className="h-[400px] w-full animate-pulse bg-slate-100 dark:bg-white/5 rounded-2xl mb-8 border border-slate-200 dark:border-white/10"></div>;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    const axisColor = isDark ? "#94a3b8" : "#64748b";
    const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
    const tooltipBg = isDark ? "#0f172a" : "#ffffff";
    const tooltipBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const tooltipText = isDark ? "#f8fafc" : "#0f172a";

    const chartData = externalData || fetchedData;
    const isGlobal = !externalData;

    return (
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-8 w-full relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                </div>
                {isGlobal && (
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                        {['7d', '30d', '1y'].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRange(r)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${range === r ? 'bg-white dark:bg-[#0f172a] text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '1 Year'}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="h-[300px] w-full">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Loading chart data...</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSingle" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis dataKey={isGlobal ? "name" : "date"} axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                            />
                            {isGlobal && <Legend verticalAlign="top" height={36} iconType="circle" />}
                            
                            {isGlobal ? (
                                <>
                                    <Area type="monotone" dataKey="projects" name="Projects" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorProjects)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                    <Area type="monotone" dataKey="meetings" name="Meetings" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorMeetings)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                    <Area type="monotone" dataKey="contacts" name="Contacts" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorContacts)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                </>
                            ) : (
                                <Area type="monotone" dataKey={dataKey} name={dataName} stroke={color} strokeWidth={3} fillOpacity={1} fill="url(#colorSingle)" activeDot={{ r: 6, strokeWidth: 0, fill: color }} />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
