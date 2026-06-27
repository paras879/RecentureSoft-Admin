import ManageTeam from "@/components/admin/ManageTeam";

export const metadata = {
    title: "Our Team | Admin Panel",
};

export default async function ManageTeamPage() {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Our Team</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage employee testimonials and team reviews.</p>
            </div>

            <ManageTeam />
        </div>
    );
}
