import { busRoutes } from "../../src/app/data/busRoutes";

export async function onRequestGet(): Promise<Response> {
  try {
    return new Response(JSON.stringify({
      success: true,
      data: busRoutes,
      count: busRoutes.length,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Failed to fetch routes" 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const body = await context.request.json();

    // Validate required fields
    if (!body.id || !body.name || !body.description || !body.color || !Array.isArray(body.stops)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Missing required fields: id, name, description, color, stops" 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate stops structure
    for (const stop of body.stops) {
      if (!stop.name || !Array.isArray(stop.coordinates) || stop.coordinates.length !== 2) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: "Invalid stop structure. Each stop must have name and coordinates [lng, lat]" 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Check if route ID already exists
    const existingRoute = busRoutes.find((route) => route.id === body.id);
    if (existingRoute) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Route with ID '${body.id}' already exists` 
      }), { 
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return the validated route data
    return new Response(JSON.stringify({
      success: true,
      message: "Route validated successfully",
      data: body,
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Invalid JSON data" 
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}