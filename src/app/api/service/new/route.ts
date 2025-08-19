import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newService = await prisma.pilotageService.create({
      data: {
        activity: body.activity,
        amount : body.amount,
        companyId : body.companyId
      },
    });

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { error: 'Failed to create service', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
