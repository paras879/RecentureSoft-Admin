import ManageEvents from "@/components/admin/ManageEvents";

export const metadata = {
    title: "Manage Events | Admin Panel",
};

export default async function ManageEventsPage() {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Events & Gallery</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage main events, celebrations, and trips for the gallery.</p>
            </div>

            <ManageEvents />
        </div>
    );
}
