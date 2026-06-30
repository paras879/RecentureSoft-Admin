"use client";

import { useAuthGuard } from "./AdminProvider";

export default function AuthGuard({ permissionKey, children }) {
    const hasAccess = useAuthGuard(permissionKey);

    if (!hasAccess) {
        // Return null while redirecting
        return null;
    }

    return <>{children}</>;
}
