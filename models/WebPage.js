import mongoose from "mongoose";

const WebPageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true, unique: true },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

if (mongoose.models.WebPage) {
    delete mongoose.models.WebPage;
}

export default mongoose.model("WebPage", WebPageSchema);
