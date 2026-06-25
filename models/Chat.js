import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        messages: [
            {
                role: {
                    type: String,
                    required: true,
                    enum: ["user", "assistant", "model"] // Allowing model for system flexibility
                },
                content: {
                    type: String,
                    required: true
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            },
        ],
        totalMessages: {
            type: Number,
            default: 0
        },
        leadStatus: {
            type: String,
            default: "cold",
            enum: ["cold", "hot"]
        },
        firstSeen: {
            type: Date,
            default: Date.now
        },
        lastSeen: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Chat ||
    mongoose.model("Chat", ChatSchema);