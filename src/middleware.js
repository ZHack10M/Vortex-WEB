import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const protectedPaths = ["/daily", "/profile", "/server"];

  if (protectedPaths.includes(path) || path.startsWith("/server/")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const url = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}