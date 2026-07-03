import { Schema, model, models } from "mongoose";

const FAQSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    page: { type: String, default: "home", index: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default models.FAQ || model("FAQ", FAQSchema);
