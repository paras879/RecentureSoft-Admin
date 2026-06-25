import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
    title: String,
    slug: String,
    date: String,
    location: String,
    heroImage: String,
    featured: Boolean,
});

export default models.Event || model("Event", EventSchema);