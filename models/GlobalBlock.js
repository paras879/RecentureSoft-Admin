import mongoose from "mongoose";

const GlobalBlockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    targetCategory: {
        type: String,
        enum: ["all", "industries", "solutions"],
        default: "all",
        required: true
    },
    position: {
        type: String,
        enum: ["top", "bottom", "before-footer"],
        default: "bottom",
        required: true
    },
    blockData: { type: mongoose.Schema.Types.Mixed, default: {} }, // Same format as crmBlocks
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

if (mongoose.models.GlobalBlock) {
    delete mongoose.models.GlobalBlock;
}

export default mongoose.model("GlobalBlock", GlobalBlockSchema);
