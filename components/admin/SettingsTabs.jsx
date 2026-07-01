"use client";

import { useState, useRef, useEffect } from "react";
import { User, Lock, Globe, Bell, Mail, Save, Check, Users } from "lucide-react";
import { updateAdminPassword, createNewAdmin } from "@/app/admin/actions";

export default function SettingsTabs({ currentUsername = "Admin" }) {
    const [activeTab, setActiveTab] = useState("account");
    const [saved, setSaved] = useState(false);
    const [pwdMsg, setPwdMsg] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [adminMsg, setAdminMsg] = useState("");
    const [adminError, setAdminError] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [firstName, setFirstName] = useState(currentUsername);
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("parastomar@recenturesoft.com");
    const [role, setRole] = useState('super_admin');
    const [siteLogo, setSiteLogo] = useState("/Logo.png");
    const [siteEmail, setSiteEmail] = useState("info@recenturesoft.com");
    const [sitePhone, setSitePhone] = useState("+91 777 000 3288");
    const [siteAddress, setSiteAddress] = useState("A-125, Sector-63, Noida, UP 201301");
    const fileInputRef = useRef(null);
    const logoInputRef = useRef(null);

    useEffect(() => {
        fetch('/api/admin/me')
            .then(res => res.json())
            .then(data => {
                if (data.role) setRole(data.role);
            })
            .catch(console.error);

        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    if (data.settings.logoUrl) setSiteLogo(data.settings.logoUrl);
                    if (data.settings.email) setSiteEmail(data.settings.email);
                    if (data.settings.phone) setSitePhone(data.settings.phone);
                    if (data.settings.address) setSiteAddress(data.settings.address);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const savedAvatar = localStorage.getItem(`adminAvatar_${currentUsername}`);
        if (savedAvatar) setAvatarUrl(savedAvatar);

        const savedFirstName = localStorage.getItem(`adminFirstName_${currentUsername}`);
        if (savedFirstName) setFirstName(savedFirstName);

        const savedLastName = localStorage.getItem(`adminLastName_${currentUsername}`);
        if (savedLastName) setLastName(savedLastName);

        const savedEmail = localStorage.getItem(`adminEmail_${currentUsername}`);
        if (savedEmail) setEmail(savedEmail);
    }, [currentUsername]);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("File size exceeds 1MB limit.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setAvatarUrl(base64String);
                localStorage.setItem(`adminAvatar_${currentUsername}`, base64String);
                window.dispatchEvent(new CustomEvent("avatarUpdated", { detail: { currentUsername } }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSiteLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("File size exceeds 1MB limit.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSiteLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        localStorage.setItem(`adminFirstName_${currentUsername}`, firstName);
        localStorage.setItem(`adminLastName_${currentUsername}`, lastName);
        localStorage.setItem(`adminEmail_${currentUsername}`, email);
        window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { currentUsername } }));
        
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleSaveConfig = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    logoUrl: siteLogo,
                    email: siteEmail,
                    phone: sitePhone,
                    address: siteAddress
                })
            });
            const data = await res.json();
            if (data.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                alert("Failed to save settings");
            }
        } catch (error) {
            console.error("Save config error", error);
            alert("An error occurred");
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setPwdMsg("");
        setPwdError("");
        
        const fd = new FormData(e.target);
        const current = fd.get("current");
        const newPwd = fd.get("newPwd");
        const confirmPwd = fd.get("confirmPwd");

        if (newPwd !== confirmPwd) {
            setPwdError("New passwords do not match.");
            return;
        }

        const res = await updateAdminPassword(current, newPwd);
        if (res.success) {
            setPwdMsg("Password updated successfully!");
            e.target.reset();
        } else {
            setPwdError(res.error || "Failed to update password.");
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setAdminMsg("");
        setAdminError("");
        
        const fd = new FormData(e.target);
        const username = fd.get("username");
        const email = fd.get("email");
        const password = fd.get("password");

        const res = await createNewAdmin(username, email, password);
        if (res.success) {
            setAdminMsg(`Admin '${username}' created successfully!`);
            e.target.reset();
        } else {
            setAdminError(res.error || "Failed to create admin.");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar Navigation */}
            <div className="flex flex-col gap-2">
                <button 
                    onClick={() => setActiveTab("account")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left w-full ${activeTab === "account" ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"}`}
                >
                    <User className="w-5 h-5" />
                    Account Details
                </button>
                <button 
                    onClick={() => setActiveTab("website")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left w-full ${activeTab === "website" ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"}`}
                >
                    <Globe className="w-5 h-5" />
                    Website Configuration
                </button>
                <button 
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left w-full ${activeTab === "security" ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"}`}
                >
                    <Lock className="w-5 h-5" />
                    Security & Passwords
                </button>
                <button 
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left w-full ${activeTab === "notifications" ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"}`}
                >
                    <Bell className="w-5 h-5" />
                    Notifications
                </button>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* ACCOUNT DETAILS TAB */}
                {activeTab === "account" && (
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Information</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your personal information and email address.</p>
                        </div>
                        
                        <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-white/5">
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-20 h-20 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden shrink-0 cursor-pointer hover:ring-2 hover:ring-cyan-500 hover:ring-offset-2 dark:hover:ring-offset-slate-900 transition-all"
                                title="Click to change avatar"
                            >
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    `${firstName ? firstName.charAt(0).toUpperCase() : ""}${lastName ? lastName.charAt(0).toUpperCase() : ""}` || "A"
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleAvatarChange} 
                                    accept="image/jpeg, image/png, image/gif" 
                                    className="hidden" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors w-fit"
                                >
                                    Change Avatar
                                </button>
                                <p className="text-xs text-slate-500 dark:text-slate-400">JPG, GIF or PNG. 1MB max.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                                    <input 
                                        type="text" 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                                    <input 
                                        type="text" 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-2 flex items-center gap-4">
                                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                                {saved && <span className="text-emerald-500 dark:text-emerald-400 text-sm font-medium flex items-center gap-1.5 animate-in fade-in"><Check className="w-4 h-4" /> Saved successfully!</span>}
                            </div>
                        </form>
                    </div>
                )}

                {/* WEBSITE CONFIGURATION TAB */}
                {activeTab === "website" && (
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Website Configuration</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage global website settings and SEO defaults.</p>
                        </div>

                        <form onSubmit={handleSaveConfig} className="flex flex-col gap-5">
                            <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-white/5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Website Logo</label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="w-48 h-20 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden">
                                        <img src={siteLogo} alt="Site Logo" className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input 
                                            type="file" 
                                            ref={logoInputRef} 
                                            onChange={handleSiteLogoChange} 
                                            accept="image/jpeg, image/png, image/gif, image/svg+xml" 
                                            className="hidden" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => logoInputRef.current?.click()}
                                            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors w-fit"
                                        >
                                            Upload New Logo
                                        </button>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Recommended: PNG or SVG with transparent background.<br/>Max 1MB.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-4 border-b border-slate-100 dark:border-white/5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contact Email</label>
                                    <input 
                                        type="email" 
                                        value={siteEmail}
                                        onChange={(e) => setSiteEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contact Phone</label>
                                    <input 
                                        type="text" 
                                        value={sitePhone}
                                        onChange={(e) => setSitePhone(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Headquarters Address</label>
                                    <textarea 
                                        rows="2"
                                        value={siteAddress}
                                        onChange={(e) => setSiteAddress(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Website Name</label>
                                <input 
                                    type="text" 
                                    defaultValue="RecentureSoft"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Global SEO Title</label>
                                <input 
                                    type="text" 
                                    defaultValue="RecentureSoft - Innovative Digital Solutions"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Global SEO Description</label>
                                <textarea 
                                    defaultValue="RecentureSoft provides cutting edge web development, mobile apps, and AI solutions for modern businesses."
                                    className="w-full px-4 py-3 h-24 resize-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contact Email (Public)</label>
                                <input 
                                    type="email" 
                                    defaultValue="hello@recenturesoft.com"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                />
                            </div>
                            
                            <div className="pt-2 flex items-center gap-4">
                                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Configuration
                                </button>
                                {saved && <span className="text-emerald-500 dark:text-emerald-400 text-sm font-medium flex items-center gap-1.5 animate-in fade-in"><Check className="w-4 h-4" /> Configuration saved!</span>}
                            </div>
                        </form>
                    </div>
                )}

                {/* SECURITY TAB */}
                {activeTab === "security" && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security & Passwords</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Change your admin password.</p>
                            </div>

                            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                                    <input 
                                        type="password"
                                        name="current"
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                                    <input 
                                        type="password"
                                        name="newPwd"
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
                                    <input 
                                        type="password"
                                        name="confirmPwd"
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white text-sm"
                                    />
                                </div>
                                
                                {pwdError && <p className="text-sm font-medium text-red-500">{pwdError}</p>}
                                {pwdMsg && <p className="text-sm font-medium text-emerald-500 flex items-center gap-1.5"><Check className="w-4 h-4"/> {pwdMsg}</p>}

                                <div className="pt-2 flex items-center gap-4">
                                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* NOTIFICATIONS TAB */}
                {activeTab === "notifications" && (
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notification Preferences</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose what you want to be notified about.</p>
                        </div>

                        <form onSubmit={handleSaveConfig} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">New Project Inquiries</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Receive an email when someone starts a project.</span>
                                    </div>
                                    <div className="relative flex items-center ml-4">
                                        <input type="checkbox" defaultChecked className="peer sr-only" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    </div>
                                </label>

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">New Meeting Requests</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Receive an email when a consultation is scheduled.</span>
                                    </div>
                                    <div className="relative flex items-center ml-4">
                                        <input type="checkbox" defaultChecked className="peer sr-only" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    </div>
                                </label>

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">General Contact Messages</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Receive an email for standard contact form submissions.</span>
                                    </div>
                                    <div className="relative flex items-center ml-4">
                                        <input type="checkbox" defaultChecked className="peer sr-only" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    </div>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-4">
                                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Preferences
                                </button>
                                {saved && <span className="text-emerald-500 dark:text-emerald-400 text-sm font-medium flex items-center gap-1.5 animate-in fade-in"><Check className="w-4 h-4" /> Preferences saved!</span>}
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}
