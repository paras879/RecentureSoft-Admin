"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteBlog } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export default function DeleteBlogButton({ id }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this blog? This action cannot be undone.")) return;
        
        setLoading(true);
        const res = await deleteBlog(id);
        
        if (res.success) {
            router.refresh();
        } else {
            alert(res.error || "Failed to delete blog");
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
            title="Delete Blog"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
