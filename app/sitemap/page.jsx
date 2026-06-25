import React from 'react';
import Navbar from "@/components/Navbar";
import FutureFooter from "@/components/FutureFooter";
import SitemapClient from "./SitemapClient";

export const metadata = {
    title: "Sitemap | RecentureSoft",
    description: "Navigate through all pages, services, and resources available on the RecentureSoft platform. Find the information you need quickly and easily.",
    openGraph: {
        title: "Sitemap | RecentureSoft",
        description: "Complete directory of RecentureSoft's website including services, resources, and company information.",
        url: "https://recenturesoft.com/sitemap",
        siteName: "RecentureSoft",
        type: "website",
    }
};

export default function SitemapPage() {
    return (
        <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617]">
            <Navbar />
            <div className="flex-grow">
                <SitemapClient />
            </div>
            <FutureFooter />
        </main>
    );
}
