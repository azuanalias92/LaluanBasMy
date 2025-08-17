import { NextResponse } from "next/server";
import { busTimeTables } from "../../data/busTimeTable";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: busTimeTables,
      count: busTimeTables.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch timetables" }, { status: 500 });
  }
}
