import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {prisma} from "@lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: { 
        OR : [
          {username : identifier},
          {email : identifier}
      ] 
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // cek isActive hanya kalau ada field-nya
    if (!user.isActive) {
      return NextResponse.json({ error: "User is inactive" }, { status: 403 });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        role: user.role,
        companyId: user.companyId,
        isActive: (user as any).isActive ?? true,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token ,message: "Login Successful"}, { status: 200});
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
