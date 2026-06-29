import { Schema, models, model } from "mongoose";

const JobApplicationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        applyFor: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: false,
        },
        resumeUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "unread", // "unread", "read", "contacted"
        }
    },
    { timestamps: true }
);

const JobApplication = models.JobApplication || model("JobApplication", JobApplicationSchema);

export default JobApplication;
