import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  console.log("➡️ Middleware jalan untuk:", req.nextUrl.pathname);

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    console.log("➡️ Skip middleware untuk auth");
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Unauthorized, tidak ada token");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    console.log("✅ Token valid");
    return NextResponse.next();
  } catch {
    console.log("❌ Token invalid");
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
