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

    // NOTE: Lovable AI integration removed.
    // This function now requires the following environment variables to be set if you want
    // to call an external AI service:
    // - AI_API_ENDPOINT (the full URL for chat/completions)
    // - AI_API_KEY (the bearer token)
    // If those are not configured, return a helpful response so the caller can handle it.

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
        // Keep payload shape simple — adjust to match your AI provider's expected schema.
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
    // Pass-through the AI response as-is; frontend should handle parsing.
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
