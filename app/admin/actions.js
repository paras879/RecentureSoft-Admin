"use server";

import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import ProjectInquiry from "@/models/ProjectInquiry";
import MeetingRequest from "@/models/MeetingRequest";
import Contact from "@/models/Contact";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { checkPermission, logAdminActivity } from "@/lib/adminUtils";

export async function deleteBlog(id) {
    try {
        const hasAccess = await checkPermission('blogs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to delete blogs." };

        await connectDB();
        await Blog.findByIdAndDelete(id);
        revalidatePath("/admin/content/blogs");
        revalidatePath("/blog");
        await logAdminActivity('DELETE', 'Blogs', 'Deleted blog with ID ' + id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting blog:", error);
        return { success: false, error: "Failed to delete blog." };
    }
}

export async function createBlog(formData) {
    try {
        const hasAccess = await checkPermission('blogs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to create blogs." };

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
        revalidatePath("/admin/content/blogs");
        revalidatePath("/blog");
        await logAdminActivity('CREATE', 'Blogs', 'Created blog: ' + formData.title);
        return { success: true, slug };
    } catch (error) {
        console.error("Error creating blog:", error);
        return { success: false, error: "Failed to create blog. " + error.message };
    }
}

export async function updateBlog(id, formData) {
    try {
        const hasAccess = await checkPermission('blogs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to edit blogs." };

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

        revalidatePath("/admin/content/blogs");
        revalidatePath("/blog");
        revalidatePath(`/blog/${slug}`);
        await logAdminActivity('UPDATE', 'Blogs', 'Updated blog with ID ' + id);
        return { success: true, slug };
    } catch (error) {
        console.error("Error updating blog:", error);
        return { success: false, error: "Failed to update blog. " + error.message };
    }
}

export async function createPortfolio(formData) {
    try {
        const hasAccess = await checkPermission('portfolio', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to create portfolio." };
        await connectDB();
        
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        const Portfolio = (await import("@/models/Portfolio")).default;
        const existing = await Portfolio.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const newPortfolio = new Portfolio({
            title: formData.title,
            slug: slug,
            category: formData.category,
            description: formData.description,
            projectUrl: formData.projectUrl,
            image: formData.image,
            technologies: formData.technologies ? formData.technologies.split(',').map(t => t.trim()) : [],
        });

        await newPortfolio.save();
        revalidatePath("/admin/content/portfolio");
        await logAdminActivity('CREATE', 'Portfolio', 'Created portfolio project: ' + formData.title);
        return { success: true, slug };
    } catch (error) {
        console.error("Error creating portfolio:", error);
        return { success: false, error: "Failed to create portfolio. " + error.message };
    }
}

export async function updatePortfolio(id, formData) {
    try {
        const hasAccess = await checkPermission('portfolio', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to update portfolio." };
        await connectDB();
        
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        const Portfolio = (await import("@/models/Portfolio")).default;
        const existing = await Portfolio.findOne({ slug, _id: { $ne: id } });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        await Portfolio.findByIdAndUpdate(id, {
            title: formData.title,
            slug: slug,
            category: formData.category,
            description: formData.description,
            projectUrl: formData.projectUrl,
            image: formData.image,
            technologies: typeof formData.technologies === 'string' ? formData.technologies.split(',').map(t => t.trim()) : formData.technologies,
        });

        revalidatePath("/admin/content/portfolio");
        await logAdminActivity('UPDATE', 'Portfolio', 'Updated portfolio project with ID ' + id);
        return { success: true, slug };
    } catch (error) {
        console.error("Error updating portfolio:", error);
        return { success: false, error: "Failed to update portfolio. " + error.message };
    }
}

export async function createService(formData) {
    try {
        const hasAccess = await checkPermission('services', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to create service." };
        await connectDB();
        
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        const Service = (await import("@/models/Service")).default;
        const existing = await Service.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const newService = new Service({
            title: formData.title,
            slug: slug,
            shortDescription: formData.shortDescription,
            description: formData.description,
            image: formData.image,
            images: Array.isArray(formData.images) ? formData.images.filter(Boolean) : [],
            icon: formData.icon,
            features: typeof formData.features === 'string' ? formData.features.split(',').map(f => f.trim()) : formData.features,
            category: formData.category || "Enterprise Engineering",
            colSpan: formData.colSpan || "lg:col-span-6",
            color: formData.color || "cyan",
            accent: formData.accent || "from-cyan-500/20 to-blue-500/20",
            scene: formData.scene || "SoftwareDevGraphic",
            status: formData.status !== false,
        });

        await newService.save();
        revalidatePath("/admin/content/services");
        revalidatePath("/"); // Refresh homepage so new service images appear
        revalidatePath("/solutions");
        await logAdminActivity('CREATE', 'Services', 'Created service: ' + formData.title);
        return { success: true, slug };
    } catch (error) {
        console.error("Error creating service:", error);
        return { success: false, error: "Failed to create service. " + error.message };
    }
}

export async function updateService(id, formData) {
    try {
        const hasAccess = await checkPermission('services', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to update service." };
        await connectDB();
        
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        const Service = (await import("@/models/Service")).default;
        const existing = await Service.findOne({ slug, _id: { $ne: id } });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        await Service.findByIdAndUpdate(id, {
            title: formData.title,
            slug: slug,
            shortDescription: formData.shortDescription,
            description: formData.description,
            image: formData.image,
            images: Array.isArray(formData.images) ? formData.images.filter(Boolean) : [],
            icon: formData.icon,
            features: typeof formData.features === 'string' ? formData.features.split(',').map(f => f.trim()) : formData.features,
            category: formData.category,
            colSpan: formData.colSpan,
            color: formData.color,
            accent: formData.accent,
            scene: formData.scene,
            status: formData.status !== false,
        });

        revalidatePath("/admin/content/services");
        revalidatePath("/"); // Refresh homepage so updated service images appear
        revalidatePath("/solutions");
        await logAdminActivity('UPDATE', 'Services', 'Updated service with ID ' + id);
        return { success: true, slug };
    } catch (error) {
        console.error("Error updating service:", error);
        return { success: false, error: "Failed to update service. " + error.message };
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
        } else if (type === "chat") {
            const Chat = (await import("@/models/Chat")).default;
            await Chat.findByIdAndUpdate(id, { status: "read" });
        } else if (type === "application") {
            const JobApplication = (await import("@/models/JobApplication")).default;
            await JobApplication.findByIdAndUpdate(id, { status: "read" });
        } else if (type === "subscriber") {
            const Subscriber = (await import("@/models/Subscriber")).default;
            await Subscriber.findByIdAndUpdate(id, { isRead: true });
        }

        // Revalidate admin pages so the header updates
        revalidatePath("/admin", "layout");
        
        await logAdminActivity('UPDATE', 'Notifications', `Marked ${type} notification as read`);
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
        
        await logAdminActivity('UPDATE', 'Admins', 'Updated admin password');
        return { success: true };
    } catch (error) {
        console.error("Error updating password:", error);
        return { success: false, error: "An error occurred." };
    }
}

export async function createNewAdmin(username, email, password, role = 'admin') {
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
            password: hashedPassword,
            role
        });

        await logAdminActivity('CREATE', 'Admins', 'Created new admin: ' + username);
        return { success: true };
    } catch (error) {
        console.error("Error creating new admin:", error);
        return { success: false, error: "An error occurred while creating admin." };
    }
}

export async function updateAdminDetails(id, username, email, role) {
    try {
        await connectDB();
        
        // Check if username/email already exist for other admins
        const existingAdmin = await Admin.findOne({ 
            $or: [{ username }, { email }],
            _id: { $ne: id }
        });

        if (existingAdmin) {
            return { success: false, error: "Username or Email already exists for another admin." };
        }

        const admin = await Admin.findById(id);
        if (!admin) return { success: false, error: "Admin not found." };
        
        // Don't allow changing master superadmin's username/role
        if (admin.username === 'superadmin' && (username !== 'superadmin' || role !== 'super_admin')) {
            return { success: false, error: "Cannot modify the master superadmin's username or role." };
        }

        admin.username = username;
        admin.email = email;
        admin.role = role;
        
        await admin.save();

        await logAdminActivity('UPDATE', 'Admins', `Updated admin details for ${username}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating admin details:", error);
        return { success: false, error: "An error occurred while updating admin details." };
    }
}

export async function promoteAdmin(id) {
    try {
        await connectDB();
        const admin = await Admin.findById(id);
        if (!admin) return { success: false, error: "Admin not found." };
        
        admin.role = 'super_admin';
        await admin.save();
        
        await logAdminActivity('UPDATE', 'Admins', `Promoted admin with ID ${id} to super_admin`);
        return { success: true };
    } catch (error) {
        console.error("Error promoting admin:", error);
        return { success: false, error: "Failed to promote admin." };
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
        await logAdminActivity('DELETE', 'Admins', `Deleted admin with ID ${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error deleting admin:", error);
        return { success: false, error: "Failed to delete admin." };
    }
}

export async function createJobOpening(formData) {
    try {
        const hasAccess = await checkPermission('jobs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to create job opening." };
        await connectDB();
        const JobOpening = (await import("@/models/JobOpening")).default;
        
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const existing = await JobOpening.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const newJob = new JobOpening({
            title: formData.title,
            slug: slug,
            department: formData.department,
            location: formData.location,
            experience: formData.experience,
            jobType: formData.jobType || "Full Time",
            description: formData.description,
            status: formData.status !== false,
        });

        await newJob.save();
        revalidatePath("/admin/content/jobs");
        await logAdminActivity('CREATE', 'Jobs', 'Created job opening: ' + formData.title);
        return { success: true, slug };
    } catch (error) {
        console.error("Error creating job opening:", error);
        return { success: false, error: "Failed to create job opening. " + error.message };
    }
}

export async function updateJobOpening(id, formData) {
    try {
        const hasAccess = await checkPermission('jobs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to update job opening." };
        await connectDB();
        const JobOpening = (await import("@/models/JobOpening")).default;
        
        let slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const existing = await JobOpening.findOne({ slug, _id: { $ne: id } });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        await JobOpening.findByIdAndUpdate(id, {
            title: formData.title,
            slug: slug,
            department: formData.department,
            location: formData.location,
            experience: formData.experience,
            jobType: formData.jobType,
            description: formData.description,
            status: formData.status !== false,
        });

        revalidatePath("/admin/content/jobs");
        await logAdminActivity('UPDATE', 'Jobs', 'Updated job opening with ID ' + id);
        return { success: true, slug };
    } catch (error) {
        console.error("Error updating job opening:", error);
        return { success: false, error: "Failed to update job opening. " + error.message };
    }
}

export async function deleteJobOpening(id) {
    try {
        const hasAccess = await checkPermission('jobs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to delete job opening." };
        await connectDB();
        const JobOpening = (await import("@/models/JobOpening")).default;
        await JobOpening.findByIdAndDelete(id);
        revalidatePath("/admin/content/jobs");
        await logAdminActivity('DELETE', 'Jobs', 'Deleted job opening with ID ' + id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting job opening:", error);
        return { success: false, error: "Failed to delete job opening." };
    }
}

export async function deleteSubscriber(id) {
    try {
        const hasAccess = await checkPermission('subscribers', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to delete subscriber." };
        await connectDB();
        const Subscriber = (await import("@/models/Subscriber")).default;
        await Subscriber.findByIdAndDelete(id);
        revalidatePath("/admin/subscribers");
        await logAdminActivity('DELETE', 'Subscribers', 'Deleted subscriber with ID ' + id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting subscriber:", error);
        return { success: false, error: "Failed to delete subscriber." };
    }
}

export async function updateAdminPermissions(id, permissions) {
    try {
        await connectDB();
        
        const admin = await Admin.findById(id);
        if (!admin) return { success: false, error: "Admin not found." };
        if (admin.role === 'super_admin') {
            return { success: false, error: "Super Admins always have full permissions." };
        }

        // Update permissions Map safely for Mongoose
        admin.set('permissions', permissions);
        admin.markModified('permissions');
        await admin.save();

        await logAdminActivity('UPDATE', 'Admins', `Updated permissions for admin ID ${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating admin permissions:", error);
        return { success: false, error: "Failed to update permissions." };
    }
}

export async function createFaq(formData) {
    try {
        const hasAccess = await checkPermission('faqs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to create FAQ." };
        await connectDB();
        
        const FAQ = (await import("@/models/FAQ")).default;
        
        const newFaq = new FAQ({
            question: formData.question,
            answer: formData.answer,
            page: formData.page || "home",
            order: formData.order || 0,
            isActive: formData.isActive !== false,
        });

        await newFaq.save();
        revalidatePath("/admin/content/faqs");
        await logAdminActivity('CREATE', 'FAQs', 'Created FAQ: ' + formData.question);
        return { success: true };
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return { success: false, error: "Failed to create FAQ. " + error.message };
    }
}

export async function updateFaq(id, formData) {
    try {
        const hasAccess = await checkPermission('faqs', 'manage');
        if (!hasAccess) return { success: false, error: "Unauthorized to update FAQ." };
        await connectDB();
        
        const FAQ = (await import("@/models/FAQ")).default;

        await FAQ.findByIdAndUpdate(id, {
            question: formData.question,
            answer: formData.answer,
            page: formData.page || "home",
            order: formData.order || 0,
            isActive: formData.isActive !== false,
        });

        revalidatePath("/admin/content/faqs");
        await logAdminActivity('UPDATE', 'FAQs', 'Updated FAQ with ID ' + id);
        return { success: true };
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return { success: false, error: "Failed to update FAQ. " + error.message };
    }
}
