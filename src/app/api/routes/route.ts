import { NextRequest, NextResponse } from "next/server";
import { busRoutes } from "../../data/busRoutes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: busRoutes,
      count: busRoutes.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch routes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.id || !body.name || !body.description || !body.color || !Array.isArray(body.stops)) {
      return NextResponse.json({ success: false, error: "Missing required fields: id, name, description, color, stops" }, { status: 400 });
    }

    // Validate stops structure
    for (const stop of body.stops) {
      if (!stop.name || !Array.isArray(stop.coordinates) || stop.coordinates.length !== 2) {
        return NextResponse.json({ success: false, error: "Invalid stop structure. Each stop must have name and coordinates [lng, lat]" }, { status: 400 });
      }
    }

    // Check if route ID already exists
    const existingRoute = busRoutes.find((route) => route.id === body.id);
    if (existingRoute) {
      return NextResponse.json({ success: false, error: `Route with ID '${body.id}' already exists` }, { status: 409 });
    }

    // Return the validated route data (in a real app, you'd save this to a database)
    return NextResponse.json(
      {
        success: true,
        message: "Route validated successfully",
        data: body,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Invalid JSON data" }, { status: 400 });
  }
}
