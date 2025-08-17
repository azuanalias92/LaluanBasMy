import { busTimeTables } from "../../src/app/data/busTimeTable";

export async function onRequestGet(): Promise<Response> {
  try {
    return new Response(JSON.stringify({
      success: true,
      data: busTimeTables,
      count: busTimeTables.length,
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
      error: "Failed to fetch timetables" 
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