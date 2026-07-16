import SitemapManager from "@/components/admin/SitemapManager";

export const metadata = {
    title: "Sitemap Management | Admin",
};

export default function SitemapPage() {
    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sitemap Management</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Manage your website sitemap. All pages are automatically discovered and categorised.
                </p>
            </div>
            <SitemapManager />
        </div>
    );
}
