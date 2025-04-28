import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("Middleware is running...");

    const cookies = req.cookies;
    console.log("All cookies:", cookies);

    const role = cookies.get("role")?.value;
    console.log("Middleware detected role:", role);

    if (!role) {
        console.log("No role found, redirecting to unauthorized");
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    const protectedRoutes = {
        Tenant: ["/tenant"],
        Landlord: ["/landlord"],
    };

    console.log(`Checking access for role ${role} on path ${req.nextUrl.pathname}`);

    for (const [allowedRole, routes] of Object.entries(protectedRoutes)) {
        console.log(`Checking role: ${allowedRole} for paths: ${routes}`);
        if (
            routes.some(route => req.nextUrl.pathname.startsWith(route)) &&
            role !== allowedRole
        ) {
            console.log(`Unauthorized Access: ${req.nextUrl.pathname} for role ${role}`);
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/tenant/:path*", "/landlord/:path*"],
};
