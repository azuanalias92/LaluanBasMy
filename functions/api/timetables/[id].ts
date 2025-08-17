import { busTimeTables } from "../../../src/app/data/busTimeTable";

export async function onRequestGet(context: { params: { id: string } }): Promise<Response> {
  try {
    const { id: timetableId } = context.params;
    const timetable = busTimeTables.find((t) => t.id === timetableId);

    if (!timetable) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Timetable with ID '${timetableId}' not found` 
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: timetable,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Failed to fetch timetable" 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}