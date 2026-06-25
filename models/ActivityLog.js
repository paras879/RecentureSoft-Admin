import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'REPLY']
    },
    module: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    adminUsername: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ActivityLog = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
