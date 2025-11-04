import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { lat, lon, location } = await req.json();
    const API_KEY = Deno.env.get('OPENWEATHER_API_KEY');

    if (!API_KEY) {
      throw new Error('OpenWeather API key not configured');
    }

    let coordinates = { lat, lon };

    // If location name provided, geocode it first
    if (location && !lat) {
      const geocodeResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)},KE&limit=1&appid=${API_KEY}`
      );
      
      if (!geocodeResponse.ok) {
        throw new Error('Failed to geocode location');
      }
      
      const geocodeData = await geocodeResponse.json();
      
      if (geocodeData && geocodeData.length > 0) {
        coordinates = { lat: geocodeData[0].lat, lon: geocodeData[0].lon };
      } else {
        // Default to Nairobi
        coordinates = { lat: -1.2921, lon: 36.8219 };
      }
    }

    // Fetch current weather and forecast in parallel
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`
      ),
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    return new Response(
      JSON.stringify({
        current: currentData,
        forecast: forecastData,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
