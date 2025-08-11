import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newService = await prisma.pilotageService.create({
      data: {
        doc_number: body.doc_number,
        id_jasa: body.id_jasa,
        ship_name: body.ship_name,
        master: body.master,
        agency: body.agency,
        loa: body.loa,
        activity: body.activity,
        from: body.from,
        to: body.to,
        last_port: body.last_port,
        next_port: body.next_port,
        pilot: body.pilot,
        pilot_on: new Date(body.pilot_on),
        pilot_off: new Date(body.pilot_off),
        tug_service_id: body.tug_service_id,
        note: body.note,
        status: body.status,
        amount: body.amount,
        submited_by: body.submited_by,
        submit_time: new Date(),
        created_by: body.created_by,
      },
    });

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
