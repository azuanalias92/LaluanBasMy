import { busRoutes } from "../../../src/app/data/busRoutes";

export async function onRequestGet(context: { params: { id: string } }): Promise<Response> {
  try {
    const { id: routeId } = context.params;
    const route = busRoutes.find((r) => r.id === routeId);

    if (!route) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Route with ID '${routeId}' not found` 
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: route,
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
      error: "Failed to fetch route" 
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