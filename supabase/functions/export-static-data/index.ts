import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: images } = await supabase
    .from("product_images")
    .select("*")
    .order("product_id")
    .order("sort_order", { ascending: true });

  // Merge images into products
  const imageMap: Record<string, any[]> = {};
  for (const img of (images || [])) {
    if (!imageMap[img.product_id]) imageMap[img.product_id] = [];
    imageMap[img.product_id].push(img);
  }

  const merged = (products || []).map((p: any) => ({
    ...p,
    images: (imageMap[p.id] || []).map((img: any) => ({
      id: img.id,
      image_url: img.image_url,
      sort_order: img.sort_order,
    })),
  }));

  return new Response(JSON.stringify({ products: merged, totalProducts: merged.length, totalImages: (images || []).length }, null, 2), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
});
