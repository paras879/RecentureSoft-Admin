import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // Check if the route is an admin route
    if (pathname.startsWith("/admin")) {
        // Exclude the login page and reset-password page
        if (pathname === "/admin/login" || pathname === "/admin/reset-password") {
            return NextResponse.next();
        }

        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            // Verify JWT
            const secret = new TextEncoder().encode(
                process.env.ADMIN_JWT_SECRET || "fallback_super_secret_recenturesoft_key_2026"
            );
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            // Invalid token
            console.error("JWT Verification failed in middleware:", error);
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: ["/admin/:path*"],
};
