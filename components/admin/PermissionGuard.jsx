"use client";

import { useAdmin } from "./AdminProvider";

export default function PermissionGuard({ permissionKey, fallback = null, children }) {
    const { admin } = useAdmin();
    const role = admin?.role || 'super_admin';
    const perms = admin?.permissions || {};

    if (role === 'super_admin') {
        return <>{children}</>;
    }

    const permission = perms[permissionKey];
    if (permission && permission.read) {
        return <>{children}</>;
    }

    return fallback;
}
