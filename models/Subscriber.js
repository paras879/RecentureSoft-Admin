import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        status: {
            type: String,
            enum: ['active', 'unsubscribed'],
            default: 'active'
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);
