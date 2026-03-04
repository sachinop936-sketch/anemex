import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple constant-time string comparison
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Admin credentials config
    const ADMIN_CREDENTIALS: Record<string, { email: string; password: string }> = {
      admin: { email: "admin@stylebazaar.com", password: "Admin@123456" },
    };

    // Normalize: if email provided, find by email; otherwise by username
    let adminEntry: { email: string; password: string } | undefined;
    if (username.includes("@")) {
      adminEntry = Object.values(ADMIN_CREDENTIALS).find((c) => c.email === username);
    } else {
      adminEntry = ADMIN_CREDENTIALS[username.toLowerCase()];
    }

    if (!adminEntry || !secureCompare(password, adminEntry.password)) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Find user by email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    const user = userData?.users?.find((u) => u.email === adminEntry!.email);

    if (!user || userError) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - not an admin" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate a magic link and verify it to create a session
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: adminEntry.email,
    });

    if (linkError || !linkData?.properties?.hashed_token) {
      console.error("generateLink error:", linkError);
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the OTP to get a session
    const verifyRes = await fetch(`${supabaseUrl}/auth/v1/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
      },
      body: JSON.stringify({
        type: "magiclink",
        token_hash: linkData.properties.hashed_token,
      }),
    });

    const sessionData = await verifyRes.json();

    if (!verifyRes.ok || !sessionData.access_token) {
      console.error("verify error:", JSON.stringify(sessionData));
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        access_token: sessionData.access_token,
        refresh_token: sessionData.refresh_token,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
