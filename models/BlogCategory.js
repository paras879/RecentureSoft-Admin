import mongoose from "mongoose";

const BlogCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.models.BlogCategory || mongoose.model("BlogCategory", BlogCategorySchema);
