import { Schema, models, model } from "mongoose";

const JobOpeningSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            default: "Full Time",
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

const JobOpening = models.JobOpening || model("JobOpening", JobOpeningSchema);

export default JobOpening;
