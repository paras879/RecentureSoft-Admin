"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Skip fetching if we are on the login page
        if (pathname === "/admin/login") {
            setLoading(false);
            return;
        }

        fetch("/api/admin/me", { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                if (!data.username && pathname !== "/admin/login") {
                    router.push("/admin/login");
                } else {
                    setAdmin(data);
                }
            })
            .catch(error => {
                console.error("Failed to fetch admin details", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
        );
    }

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}

export function useAuthGuard(permissionKey) {
    const { admin } = useAdmin();
    const router = useRouter();
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        if (!admin) return;

        if (admin.role === "super_admin") {
            setHasAccess(true);
            return;
        }

        const perms = admin.permissions || {};
        const permission = perms[permissionKey];
        
        if (!permission) {
            setHasAccess(true); // DEFAULT-ALLOW
            return;
        }

        if (permission.view === false) {
            console.log(`[AuthGuard] Access denied for ${permissionKey}: view is explicitly false.`);
            router.push("/admin/dashboard");
        } else if (permission.read === false) {
            console.log(`[AuthGuard] Access denied for ${permissionKey}: read is explicitly false.`);
            router.push("/admin/dashboard");
        } else {
            console.log(`[AuthGuard] Access granted for ${permissionKey}:`, permission);
            setHasAccess(true);
        }
    }, [admin, permissionKey, router]);

    return hasAccess;
}
