import CreateFaqForm from "@/components/admin/CreateFaqForm";
import { connectDB } from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import AuthGuard from "@/components/admin/AuthGuard";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Edit FAQ | Admin",
};

export default async function EditFaqPage({ params }) {
    await connectDB();
    const { id } = await params;
    
    const faq = await FAQ.findById(id).lean();

    if (!faq) {
        return notFound();
    }

    // Convert MongoDB _id to string for the client component
    const faqData = {
        ...faq,
        _id: faq._id.toString()
    };

    return (
        <AuthGuard permissionKey="faqs">
            <CreateFaqForm initialData={faqData} />
        </AuthGuard>
    );
}
