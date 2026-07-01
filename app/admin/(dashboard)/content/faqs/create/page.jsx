import CreateFaqForm from "@/components/admin/CreateFaqForm";
import AuthGuard from "@/components/admin/AuthGuard";

export const metadata = {
    title: "Add New FAQ | Admin",
};

export default function CreateFaqPage() {
    return (
        <AuthGuard permissionKey="faqs">
            <CreateFaqForm />
        </AuthGuard>
    );
}
