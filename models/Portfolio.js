import { Schema, model, models } from "mongoose";

const PortfolioSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    projectUrl: String, // The new URL field for redirecting
    image: String,
    images: String, // The user used 'images' in the DB despite saying 'image'
    technologies: [{ type: String }]
}, { timestamps: true });

export default models.Portfolio || model("Portfolio", PortfolioSchema, "Portfolio");
