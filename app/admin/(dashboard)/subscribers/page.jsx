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
                {/* Could add Export CSV button here in future */}
            </div>

            <AdminDataTable 
                data={formattedSubscribers}
                type="subscriber"
                searchPlaceholder="Search by email..."
            />
        </div>
    );
}
