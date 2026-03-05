import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const UPI_ID = Deno.env.get("UPI_MERCHANT_ID") || "";
const UPI_TR = Deno.env.get("UPI_TRANSACTION_REF") || "";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { items, totalAmount } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items payload");
      return new Response(JSON.stringify({ error: "Invalid items" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
      console.error("Invalid totalAmount:", totalAmount);
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!UPI_ID || !UPI_TR) {
      console.error("Missing UPI credentials in secrets");
      return new Response(JSON.stringify({ error: "Payment not configured" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const itemNames = items.map((item: { name: string }) => item.name).join(', ');
    const upiLink = `upi://pay?ver=01&mode=19&pa=${encodeURIComponent(UPI_ID)}&pn=BUZZCART&cu=INR&mc=5732&qrMedium=04&tr=${encodeURIComponent(UPI_TR)}&am=${totalAmount}&tn=${encodeURIComponent(itemNames)}`;

    console.log("Payment link generated for amount:", totalAmount);

    return new Response(JSON.stringify({ paymentUrl: upiLink }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
