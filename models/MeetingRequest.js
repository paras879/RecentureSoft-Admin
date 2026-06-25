import mongoose from "mongoose";

const MeetingRequestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
            trim: true,
        },
        date: {
            type: String,
            required: [true, "Date is required"],
            trim: true,
        },
        time: {
            type: String,
            required: [true, "Time is required"],
            trim: true,
        },
        topic: {
            type: String,
            required: [true, "Topic is required"],
            trim: true,
        },
        status: {
            type: String,
            default: "new",
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.MeetingRequest || mongoose.model("MeetingRequest", MeetingRequestSchema);
