import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
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
        subject: {
            type: String,
            required: false,
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
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

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
