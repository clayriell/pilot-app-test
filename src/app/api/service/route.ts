// app/api/service/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const services = await prisma.pilotageService.findMany({
      orderBy: { id: 'desc' },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const deletedService = await prisma.pilotageService.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedService);
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updatedService = await prisma.pilotageService.update({
      where: { id: parseInt(id) },
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
        created_by: body.created_by,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
