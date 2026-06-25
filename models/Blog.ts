import { Schema, models, model } from "mongoose";

const BlogSchema = new Schema(
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

        excerpt: {
            type: String,
            required: true,
            maxlength: 300,
        },

        content: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        tags: [
            {
                type: String,
            },
        ],

        author: {
            type: String,
            default: "Paras Tomar",
        },

        image: {
            type: String,
            required: true,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        published: {
            type: Boolean,
            default: true,
        },

        views: {
            type: Number,
            default: 0,
        },

        readingTime: {
            type: String,
            default: "5 min read",
        },

        seoTitle: {
            type: String,
        },

        seoDescription: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;