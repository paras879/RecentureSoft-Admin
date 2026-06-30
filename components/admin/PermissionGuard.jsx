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
    if (!permission) { // STRICT DEFAULT-DENY
        return fallback;
    }

    // Check action
    if (action === 'manage') {
        if (permission.manage === true) return <>{children}</>;
    } else {
        // action === 'view'
        if (permission.view === true || permission.manage === true) return <>{children}</>;
    }

    return fallback;
}
