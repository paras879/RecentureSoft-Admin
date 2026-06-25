import { Schema, model, models } from "mongoose";

const EventGallerySchema = new Schema({
    eventSlug: String,
    year: Number,
    title: String,
    image: String,
    order: Number,
});

export default models.EventGallery ||
    model("EventGallery", EventGallerySchema);