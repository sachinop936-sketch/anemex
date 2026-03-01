const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid URL format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Scraping service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Scraping product URL:", formattedUrl);

    // Use extract format for structured JSON extraction
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ["markdown", "extract"],
        extract: {
          schema: {
            type: "object",
            properties: {
              product_title: { type: "string", description: "The main product title/name" },
              price: { type: "number", description: "Current selling price in INR (number only)" },
              original_price: { type: "number", description: "MRP or original price before discount in INR (number only)" },
              discount_percent: { type: "number", description: "Discount percentage (number only)" },
              description: { type: "string", description: "Full product description text" },
              short_description: { type: "string", description: "A brief tagline or short description (1-2 sentences)" },
              category: { type: "string", description: "Product category (e.g. Electronics, Fashion, Home)" },
              rating: { type: "number", description: "Average product rating (1-5)" },
              review_count: { type: "number", description: "Total number of reviews" },
              features: {
                type: "array",
                items: { type: "string" },
                description: "Key product features as bullet points",
              },
              seller: { type: "string", description: "Seller or brand name" },
              images: {
                type: "array",
                items: { type: "string" },
                description: "All product image URLs (full resolution)",
              },
            },
            required: ["product_title"],
          },
          prompt:
            "Extract complete product information from this ecommerce product page. Get all available images, the current selling price and original MRP in Indian Rupees (INR). Extract all specifications and features.",
        },
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok) {
      console.error("Firecrawl error:", scrapeData);
      return new Response(
        JSON.stringify({ success: false, error: scrapeData.error || "Failed to scrape product page" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const extracted = scrapeData.data?.extract || scrapeData.extract || {};
    const markdown = scrapeData.data?.markdown || scrapeData.markdown || "";

    // Also try to get images from metadata/links if extract didn't find them
    const metadataImg = scrapeData.data?.metadata?.ogImage;
    let images = (extracted.images || []).filter((img: string) => img && img.startsWith("http"));
    if (images.length === 0 && metadataImg) {
      images = [metadataImg];
    }

    const product = {
      name: extracted.product_title || "Untitled Product",
      short_description: extracted.short_description || "",
      description: extracted.description || markdown.slice(0, 2000),
      price: extracted.price || 0,
      original_price: extracted.original_price || extracted.price || 0,
      discount_percent: extracted.discount_percent || 0,
      category: extracted.category || "General",
      rating: Math.min(5, Math.max(0, extracted.rating || 4.5)),
      review_count: extracted.review_count || 0,
      features: extracted.features || [],
      seller: extracted.seller || "",
      images,
      free_delivery: true,
      is_visible: true,
      stock: 100,
      tag: null,
      stock_tag: null,
      source_url: formattedUrl,
    };

    if (!product.discount_percent && product.original_price > product.price && product.price > 0) {
      product.discount_percent = Math.round(
        ((product.original_price - product.price) / product.original_price) * 100
      );
    }

    console.log("Product scraped successfully:", product.name);

    return new Response(
      JSON.stringify({ success: true, product }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Scrape error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
