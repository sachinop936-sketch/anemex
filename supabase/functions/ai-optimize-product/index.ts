import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { product } = await req.json();

    if (!product || !product.name) {
      return new Response(
        JSON.stringify({ success: false, error: "Product data with name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are an ecommerce product optimization expert. Given this product data, generate optimized content.

Product Name: ${product.name}
Description: ${product.description || "N/A"}
Category: ${product.category || "General"}
Price: ₹${product.price}
Features: ${(product.features || []).join(", ") || "N/A"}

Generate the following and return as a JSON using the tool provided:
1. An SEO-optimized product title (concise, keyword-rich, max 80 chars)
2. A professional short description/tagline (1 line, catchy)
3. A professional product description (2-3 paragraphs, persuasive)
4. 5-8 bullet-point features (practical, benefit-oriented)
5. 2-3 relevant tags (e.g. "trending", "bestseller", "new", "limited")
6. 5 realistic customer reviews with name, rating (3.5-5), and comment

Keep everything in Indian English context. Prices in INR.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert ecommerce copywriter and product optimizer for Indian markets." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "optimize_product",
              description: "Return optimized product data",
              parameters: {
                type: "object",
                properties: {
                  optimized_title: { type: "string", description: "SEO-optimized product title" },
                  short_description: { type: "string", description: "Catchy one-line tagline" },
                  description: { type: "string", description: "Professional 2-3 paragraph description" },
                  features: {
                    type: "array",
                    items: { type: "string" },
                    description: "5-8 benefit-oriented bullet features"
                  },
                  tag: { type: "string", enum: ["trending", "bestseller", "new", "limited"], description: "Best matching tag" },
                  reviews: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        rating: { type: "number" },
                        comment: { type: "string" }
                      },
                      required: ["name", "rating", "comment"]
                    },
                    description: "5 realistic reviews"
                  }
                },
                required: ["optimized_title", "short_description", "description", "features", "tag", "reviews"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "optimize_product" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "AI credits exhausted. Please add credits in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: "AI optimization failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await response.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(aiData));
      return new Response(
        JSON.stringify({ success: false, error: "AI returned unexpected format" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const optimized = JSON.parse(toolCall.function.arguments);

    console.log("Product optimized successfully:", optimized.optimized_title);

    return new Response(
      JSON.stringify({ success: true, optimized }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI optimize error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
