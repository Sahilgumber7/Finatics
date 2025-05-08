// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Public routes that don't need auth
const PUBLIC_PATHS = ["/", "/login", "/signup", "/api/auth"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  const isPublic = PUBLIC_PATHS.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isPublic) return NextResponse.next();

  // Get JWT from NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Match all routes except static files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
