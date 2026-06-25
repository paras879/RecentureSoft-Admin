"use server";

import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import Contact from "@/models/Contact";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function deleteBlog(id) {
    try {
        await connectDB();
        await Blog.findByIdAndDelete(id);
        revalidatePath("/admin/blogs");
        revalidatePath("/blog");
        return { success: true };
    } catch (error) {
        console.error("Error deleting blog:", error);
        return { success: false, error: "Failed to delete blog." };
    }
}

export async function createBlog(formData) {
    try {
        await connectDB();
        
        // Basic slug generation from title if not provided
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        // Ensure slug is unique (basic check)
        const existing = await Blog.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const newBlog = new Blog({
            title: formData.title,
            slug: slug,
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
            author: formData.author || "Paras Tomar",
            image: formData.image || "/images/blog/default.jpg",
            featured: formData.featured || false,
            published: formData.published !== false,
            readingTime: formData.readingTime || "5 min read",
            seoTitle: formData.seoTitle,
            seoDescription: formData.seoDescription
        });

        await newBlog.save();
        revalidatePath("/admin/blogs");
        revalidatePath("/blog");
        return { success: true, slug };
    } catch (error) {
        console.error("Error creating blog:", error);
        return { success: false, error: "Failed to create blog. " + error.message };
    }
}

export async function updateBlog(id, formData) {
    try {
        await connectDB();
        
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        // Ensure slug is unique if it changed (excluding current blog)
        const existing = await Blog.findOne({ slug, _id: { $ne: id } });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        await Blog.findByIdAndUpdate(id, {
            title: formData.title,
            slug: slug,
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags,
            author: formData.author,
            image: formData.image,
            featured: formData.featured,
            published: formData.published,
            readingTime: formData.readingTime,
            seoTitle: formData.seoTitle,
            seoDescription: formData.seoDescription
        });

        revalidatePath("/admin/blogs");
        revalidatePath("/blog");
        revalidatePath(`/blog/${slug}`);
        return { success: true, slug };
    } catch (error) {
        console.error("Error updating blog:", error);
        return { success: false, error: "Failed to update blog. " + error.message };
    }
}

export async function markNotificationAsRead(type, id) {
    try {
        await connectDB();
        
        if (type === "project") {
            await ProjectInquiry.findByIdAndUpdate(id, { status: "read" });
        } else if (type === "meeting") {
            await MeetingRequest.findByIdAndUpdate(id, { status: "read" });
        } else if (type === "contact") {
            await Contact.findByIdAndUpdate(id, { status: "read" });
        }

        // Revalidate admin pages so the header updates
        revalidatePath("/admin", "layout");
        
        return { success: true };
    } catch (error) {
        console.error("Error marking as read:", error);
        return { success: false };
    }
}

export async function updateAdminPassword(currentPassword, newPassword) {
    try {
        await connectDB();
        
        // Find the admin (assuming only 1 admin for now)
        const admin = await Admin.findOne({});
        if (!admin) return { success: false, error: "Admin not found." };
        
        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) return { success: false, error: "Current password is incorrect." };
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password
        admin.password = hashedPassword;
        await admin.save();
        
        return { success: true };
    } catch (error) {
        console.error("Error updating password:", error);
        return { success: false, error: "An error occurred." };
    }
}

export async function createNewAdmin(username, email, password) {
    try {
        await connectDB();

        // Check if username or email already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (existingAdmin) {
            return { success: false, error: "Username or Email already exists." };
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        await Admin.create({
            username,
            email,
            password: hashedPassword
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating new admin:", error);
        return { success: false, error: "An error occurred while creating admin." };
    }
}

export async function deleteAdmin(id) {
    try {
        await connectDB();
        
        const admin = await Admin.findById(id);
        if (!admin) return { success: false, error: "Admin not found." };
        if (admin.username === 'superadmin') {
            return { success: false, error: "Cannot delete the master superadmin." };
        }

        await Admin.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting admin:", error);
        return { success: false, error: "Failed to delete admin." };
    }
}
