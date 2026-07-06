import CreateFaqForm from "@/components/admin/CreateFaqForm";
import AuthGuard from "@/components/admin/AuthGuard";
import { connectDB } from "@/lib/mongodb";
import WebPage from "@/models/WebPage";

export const metadata = {
    title: "Add New FAQ | Admin",
};

export default async function CreateFaqPage() {
    await connectDB();
    const webPages = await WebPage.find({ status: "active" }).select('name path').lean();
    
    // Convert paths to value format (e.g., "/seo-service" -> "seo-service")
    const dynamicPages = webPages.map(page => ({
        value: page.path.replace(/^\/+/, ''), // remove leading slash
        label: page.name
    }));

    return (
        <AuthGuard permissionKey="faqs">
            <CreateFaqForm dynamicPages={dynamicPages} />
        </AuthGuard>
    );
}
