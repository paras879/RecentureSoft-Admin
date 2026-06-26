import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String },
    description: { type: String },
    image: { type: String },
    images: [{ type: String }],
    icon: { type: String },
    features: [{ type: String }],
    category: { type: String, default: "Enterprise Engineering" },
    colSpan: { type: String, default: "lg:col-span-6" },
    color: { type: String, default: "cyan" },
    accent: { type: String, default: "from-cyan-500/20 to-blue-500/20" },
    scene: { type: String, default: "SoftwareDevGraphic" },
    status: { type: Boolean, default: true }
}, { timestamps: true });

export default models.Service || model("Service", ServiceSchema, "Service");
