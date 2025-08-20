// app/api/service/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const pilotageService = await prisma.pilotageService.findMany({
      include: {
        agency: true,
        terminalStart: true,
        terminalEnd: true,
        shipDetails: true,
      },
      orderBy: { id: 'desc' },
    });

    return NextResponse.json(pilotageService);
  } catch (error) {
    console.error('Error fetching pilotageService:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

