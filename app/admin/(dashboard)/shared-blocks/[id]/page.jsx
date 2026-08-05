import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import GlobalBlockEditor from "@/components/admin/GlobalBlockEditor";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Shared Block Edit | Admin",
};

export default async function EditSharedBlockPage({ params }) {
    const { id } = await params;

    let block = null;
    try {
        await connectDB();
        const db = mongoose.connection;
        block = await db.collection("globalblocks").findOne({ _id: new ObjectId(id) });
    } catch {
        notFound();
    }

    if (!block) notFound();

    // Serialize MongoDB document
    const serialized = JSON.parse(JSON.stringify(block));

    return <GlobalBlockEditor initialData={serialized} blockId={id} />;
}
