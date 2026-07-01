import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema({
    type: { type: String, default: "global", unique: true },
    logoUrl: { type: String, default: "/Logo.png" },
    email: { type: String, default: "info@recenturesoft.com" },
    phone: { type: String, default: "+91 777 000 3288" },
    address: { type: String, default: "A-125, Sector-63, Noida, UP 201301" },
    socialLinks: {
        facebook: { type: String, default: "https://facebook.com/recenturesoft" },
        twitter: { type: String, default: "https://x.com/recenturesoft" },
        linkedin: { type: String, default: "https://www.linkedin.com/company/recenturesoft/posts/?feedView=all" },
        pinterest: { type: String, default: "https://pinterest.com/recenturesoft" },
        instagram: { type: String, default: "https://instagram.com/recenturesoft" },
        youtube: { type: String, default: "https://youtube.com/@recenturesoft" }
    }
}, { timestamps: true });

if (mongoose.models.SiteSettings) {
    delete mongoose.models.SiteSettings;
}
export default mongoose.model("SiteSettings", SiteSettingsSchema);
