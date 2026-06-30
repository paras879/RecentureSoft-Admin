import CreateBlogForm from "@/components/admin/CreateBlogForm";
import { connectDB } from "@/lib/mongodb";
import BlogCategory from "@/models/BlogCategory";

export const metadata = {
    title: "Create Blog | Admin",
};

export default async function CreateBlogPage() {
    await connectDB();
    const categories = await BlogCategory.find().sort({ createdAt: 1 }).lean();
    const catNames = categories.map(c => c.name);

    return <CreateBlogForm categories={catNames} />;
}
