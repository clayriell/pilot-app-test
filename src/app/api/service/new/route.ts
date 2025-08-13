import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi data yang diperlukan
    const requiredFields = [
      'doc_number', 'id_jasa', 'ship_name', 'master', 'agency', 
      'loa', 'activity', 'from', 'to', 'last_port', 'next_port', 
      'pilot', 'pilot_on', 'pilot_off', 'tug_service_id', 
      'status', 'amount', 'submited_by', 'created_by'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` }, 
          { status: 400 }
        );
      }
    }

    const newService = await prisma.pilotageService.create({
      data: {
        doc_number: parseInt(body.doc_number),
        id_jasa: parseInt(body.id_jasa),
        ship_name: body.ship_name,
        master: body.master,
        agency: body.agency,
        loa: parseInt(body.loa),
        activity: body.activity,
        from: body.from,
        to: body.to,
        last_port: body.last_port,
        next_port: body.next_port,
        pilot: body.pilot,
        pilot_on: new Date(body.pilot_on),
        pilot_off: new Date(body.pilot_off),
        tug_service_id: parseInt(body.tug_service_id),
        note: body.note || '',
        status: body.status,
        amount: parseFloat(body.amount),
        submited_by: body.submited_by,
        submit_time: new Date(),
        created_by: body.created_by,
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
