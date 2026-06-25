import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar"
import PremiumFooter from "@/components/PremiumFooter";
import remarkGfm from "remark-gfm";
import Blog from "@/models/Blog";
import { connectDB } from "@/lib/mongodb";


export default async function BlogDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    await connectDB();

    const blog: any = await Blog.findOne({
        slug,
    }).lean();

    if (!blog) {
        notFound();
    }

    const recommendedBlogs = await Blog.find({
        slug: { $ne: slug },
    })
        .limit(3)
        .lean();

    const formatDate = (dateString: any) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white dark:bg-[#020617]">
                <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-20 pb-10 md:pb-16">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

                        {/* LEFT SIDEBAR */}
                        <aside className="hidden xl:block xl:col-span-4 order-2">
                            <div className="sticky top-24">


                                <h3 className="text-lg font-bold mb-5 text-slate-900 dark:text-white">
                                    Recommended Articles
                                </h3>

                                <div className="space-y-5">
                                    {recommendedBlogs.map((item: any) => (
                                        <Link
                                            key={item._id || item.id}
                                            href={`/blog/${item.slug}`}
                                            className="block group"
                                            prefetch={true}
                                        >
                                            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                                                <Image
                                                    src={item.image}
                                                    alt={item.title || 'Article'}
                                                    width={300}
                                                    height={180}
                                                    unoptimized={true}
                                                    className=" w-full h-24 md:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                                                />

                                                <div className="p-4">
                                                    <span className="text-xs text-cyan-500 font-medium uppercase">
                                                        {item.category}
                                                    </span>

                                                    <h4 className="font-semibold mt-2 text-slate-900 dark:text-white line-clamp-2">
                                                        {item.title}
                                                    </h4>

                                                    <p className="text-xs text-slate-500 mt-2">
                                                        {item.readingTime || item.readTime || "5 min read"}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        </aside>

                        {/* MAIN BLOG */}
                        <div className="lg:col-span-8 xl:col-span-8 order-1 lg:order-1">

                            <div className="relative mb-8">
                                <Image
                                    src={blog.image}
                                    alt={blog.title || 'Blog Image'}
                                    width={1400}
                                    height={600}
                                    priority
                                    unoptimized={true}
                                    className=" w-full h-[220px] md:h-[280px] lg:h-[340px] xl:h-[360px] object-cover rounded-[24px]"
                                />

                                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                            </div>

                            <Link
                                href="/blog"
                                className=" inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>

                                All Articles
                            </Link>

                            <div className="mb-6">
                                <span className="text-cyan-500 text-sm font-semibold uppercase tracking-wider">
                                    {blog.category}
                                </span>
                            </div>

                            <h1
                                className="
text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl
font-bold
tracking-tight
leading-[1.05]
mb-4
text-slate-900
dark:text-white
"
                            >
                                {blog.title}
                            </h1>

                            <div className="h-1.5 w-28 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-8" />

                            <div className="mb-8 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shadow-sm">
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    <span className="font-semibold">{blog.author}</span>
                                    <span>•</span>
                                    <span>{formatDate(blog.createdAt)}</span>
                                    <span>•</span>
                                    <span>{blog.readingTime || blog.readTime || "5 min read"}</span>
                                </div>
                            </div>

                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
                                {blog.excerpt}
                            </p>

                            <article
                                className=" prose prose-base lg:prose-lg max-w-[720px] 
                                dark:prose-invert

                                prose-headings:font-semibold
                                prose-headings:tracking-tight
                                prose-headings:scroll-mt-28

                                prose-h1:text-5xl
                                prose-h2:text-3xl
                                prose-h3:text-2xl

                                prose-p:leading-7
prose-p:text-slate-700
dark:prose-p:text-slate-300

prose-a:text-cyan-500

prose-strong:text-cyan-500

prose-li:marker:text-cyan-500

prose-img:rounded-2xl

prose-table:border
prose-table:border-slate-300

prose-th:bg-slate-100
dark:prose-th:bg-slate-800
"
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {blog.content}
                                </ReactMarkdown>
                            </article>

                            <div className="mt-16 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
                                <h3 className="text-2xl font-bold mb-3">
                                    Enjoyed this article?
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    Discover more insights, engineering guides, and technology trends.
                                </p>

                                <Link
                                    href="/blog"
                                    className="inline-flex items-center px-6 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
                                >
                                    Explore More Articles
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
            <PremiumFooter />
        </>
    );
}