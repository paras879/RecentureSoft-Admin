import ManageReviews from "@/components/admin/ManageReviews";
export const metadata = {
    title: "Manage Reviews | Admin Panel",
};

export default async function ManageReviewsPage() {

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Client Reviews</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Add, edit, or remove client testimonials from the website.</p>
            </div>

            <ManageReviews />
        </div>
    );
}
