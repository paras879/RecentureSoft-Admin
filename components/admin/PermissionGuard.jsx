"use client";

import { useAdmin } from "./AdminProvider";

export default function PermissionGuard({ module, action = 'view', fallback = null, children }) {
    const { admin } = useAdmin();
    const role = admin?.role || 'super_admin';
    const perms = admin?.permissions || {};

    if (role === 'super_admin') {
        return <>{children}</>;
    }

    const permission = perms[module];
    if (!permission) { // DEFAULT-ALLOW
        return <>{children}</>;
    }

    // Check action
    if (action === "manage") {
        if (permission.manage === false || permission.write === false) return fallback;
        return <>{children}</>;
    } else {
        if (permission.view === false || permission.read === false) return fallback;
        return <>{children}</>;
    }
    
    return fallback;
}
