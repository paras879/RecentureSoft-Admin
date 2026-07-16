import { connectDB } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import AdminDataTable from "@/components/admin/AdminDataTable";

export const dynamic = 'force-dynamic';

export default async function SubscribersPage() {
    await connectDB();
    
    // Fetch subscribers sorted by newest first
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).lean();
    
    // Format data for the data table
    const formattedSubscribers = subscribers.map(sub => ({
        _id: sub._id.toString(),
        email: sub.email,
        status: sub.status,
        date: new Date(sub.createdAt).toLocaleDateString('en-US', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
    }));

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Newsletter Subscribers</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Manage your newsletter subscribers list. Total: {formattedSubscribers.length}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {formattedSubscribers.length > 0 && (
                        <>
                            <a 
                                href={`mailto:?bcc=${formattedSubscribers.map(s => s.email).join(',')}&subject=RecentureSoft Newsletter`}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-xl font-medium transition-colors border border-blue-200 dark:border-blue-500/20 text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                Send Bulk Email
                            </a>
                            <a 
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent("Email,Date Subscribed,Status\n" + formattedSubscribers.map(s => `${s.email},${s.date},${s.status}`).join('\n'))}`}
                                download="subscribers.csv"
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-xl font-medium transition-colors border border-emerald-200 dark:border-emerald-500/20 text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Export CSV
                            </a>
                        </>
                    )}
                </div>
            </div>

            <AdminDataTable 
                data={formattedSubscribers}
                type="subscriber"
                searchPlaceholder="Search by email..."
            />
        </div>
    );
}
