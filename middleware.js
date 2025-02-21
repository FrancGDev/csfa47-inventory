import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Definir rutas protegidas
    const protectedRoutes = ["/dashboard", "/mantenimiento"];

    // Verificar si la URL actual es una de las protegidas
    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url)); // Redirige al login si no hay sesión
        }
    }

    return NextResponse.next();
}

// Aplica el middleware solo en rutas específicas
export const config = {
    matcher: ["/dashboard/:path*", "/mantenimiento/:path*"],
};
