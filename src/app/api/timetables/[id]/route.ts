import { NextRequest, NextResponse } from 'next/server';
import { busTimeTables } from '../../../data/busTimeTable';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: timetableId } = await params;
    const timetable = busTimeTables.find(t => t.id === timetableId);

    if (!timetable) {
      return NextResponse.json(
        { success: false, error: `Timetable with ID '${timetableId}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: timetable
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timetable' },
      { status: 500 }
    );
  }
}