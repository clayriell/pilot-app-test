import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
// GET /api/users -> ambil semua user
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        picture: true,
        company: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ message : "Success get users data", user : users}, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}
