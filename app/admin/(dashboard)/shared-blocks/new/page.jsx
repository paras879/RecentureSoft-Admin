import GlobalBlockEditor from "@/components/admin/GlobalBlockEditor";

export const metadata = {
    title: "Naya Shared Block | Admin",
};

export default function NewSharedBlockPage() {
    return <GlobalBlockEditor initialData={null} blockId={null} />;
}
