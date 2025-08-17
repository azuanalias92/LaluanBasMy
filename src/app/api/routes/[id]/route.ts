import { NextRequest, NextResponse } from 'next/server';
import { busRoutes } from '../../../data/busRoutes';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: routeId } = await params;
    const route = busRoutes.find(r => r.id === routeId);

    if (!route) {
      return NextResponse.json(
        { success: false, error: `Route with ID '${routeId}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: route
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch route' },
      { status: 500 }
    );
  }
}