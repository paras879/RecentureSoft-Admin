import mongoose from "mongoose";

const ProjectInquirySchema = new mongoose.Schema(
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
        projectType: {
            type: String,
            required: [true, "Project type is required"],
            trim: true,
        },
        projectDetails: {
            type: String,
            required: [true, "Project details are required"],
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

export default mongoose.models.ProjectInquiry || mongoose.model("ProjectInquiry", ProjectInquirySchema);
