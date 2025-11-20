import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: "No image data provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Lovable-specific integration removed. Use a configurable AI endpoint instead.
    const AI_API_ENDPOINT = Deno.env.get("AI_API_ENDPOINT");
    const AI_API_KEY = Deno.env.get("AI_API_KEY");

    if (!AI_API_ENDPOINT || !AI_API_KEY) {
      console.warn("AI integration not configured: AI_API_ENDPOINT/AI_API_KEY missing");
      return new Response(
        JSON.stringify({ error: "AI integration not configured. Set AI_API_ENDPOINT and AI_API_KEY." }),
        { status: 501, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Forwarding request to configured AI endpoint...");

    const response = await fetch(AI_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "default",
        input: {
          type: "image_analysis",
          image_url: imageData,
          instructions: "Analyze the crop image and return a diagnosis, severity, and recommendations."
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `AI API error: ${response.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify({ diagnosis: data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error in diagnose-crop function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
