import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: products } = await supabase
    .from("products")
    .select("*, product_images(image_url, sort_order)")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  const mapped = (products || []).map((p: any) => {
    const imgs = (p.product_images || [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((i: any) => i.image_url);
    return {
      id: p.id,
      name: p.name,
      short_description: p.short_description || "",
      description: p.description || "",
      price: Number(p.price),
      original_price: Number(p.original_price),
      discount_percent: Number(p.discount_percent),
      category: p.category || "",
      tag: p.tag || null,
      stock: p.stock,
      stock_tag: p.stock_tag || null,
      rating: Number(p.rating),
      review_count: p.review_count,
      features: p.features || [],
      seller: p.seller || "",
      free_delivery: p.free_delivery,
      images: imgs.length > 0 ? imgs : ["/placeholder.svg"],
    };
  });

  return new Response(JSON.stringify(mapped, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});
