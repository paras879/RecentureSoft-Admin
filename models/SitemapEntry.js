import mongoose from "mongoose";

const SitemapEntrySchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    section: {
        type: String,
        enum: ["information", "locations", "legal"],
        required: true
    },
    lastModified: { type: Date },
    priority: { type: Number, default: 0.7, min: 0, max: 1 },
    changeFrequency: {
        type: String,
        enum: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"],
        default: "monthly"
    },
    canonical: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    source: {
        type: String,
        enum: ["static", "webpage", "location", "legal"],
        default: "webpage"
    },
}, { timestamps: true });

export default mongoose.models.SitemapEntry || mongoose.model("SitemapEntry", SitemapEntrySchema);
