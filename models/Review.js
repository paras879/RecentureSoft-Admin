import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 5,
        min: 1,
        max: 5,
    },
    avatar: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
