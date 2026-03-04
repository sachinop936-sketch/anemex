import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: products, error: pErr } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (pErr) {
    return new Response(JSON.stringify({ error: pErr.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }

  const { data: images, error: iErr } = await supabase
    .from("product_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (iErr) {
    return new Response(JSON.stringify({ error: iErr.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }

  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const { data: settings } = await supabase
    .from("store_settings")
    .select("*")
    .limit(1)
    .single();

  // Merge images into products
  const merged = (products || []).map((p: any) => {
    const pImages = (images || [])
      .filter((i: any) => i.product_id === p.id)
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((i: any) => i.image_url);
    return {
      ...p,
      images: pImages.length > 0 ? pImages : ["/placeholder.svg"],
      image: pImages[0] || "/placeholder.svg",
    };
  });

  return new Response(
    JSON.stringify({ products: merged, banners: banners || [], settings }, null, 2),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
