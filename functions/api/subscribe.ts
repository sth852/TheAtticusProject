// ─── Brevo Mailing List Subscription ─────────────────────────────────────────
// Cloudflare Pages Function — runs as an Edge Worker alongside the static site.
// Handles POST /api/subscribe and adds the email to your Brevo contact list.
//
// SETUP (one-time, in Cloudflare Pages dashboard):
//   1. Go to brevo.com → sign up for a free account
//   2. In Brevo: Contacts → Lists → Create a list (e.g. "Atticus Mailing List")
//      Copy the numeric List ID shown in the list settings
//   3. In Brevo: Profile → SMTP & API → API Keys → Generate a new API key
//   4. In Cloudflare Pages → your project → Settings → Environment Variables → Add:
//        BREVO_API_KEY  =  <your Brevo API key>
//        BREVO_LIST_ID  =  <your Brevo list ID (just the number, e.g. 3)>
//   5. Redeploy — the form will go live automatically
//
// The API key stays server-side (never exposed to the browser).
// ─────────────────────────────────────────────────────────────────────────────

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
}

interface SubscribeBody {
  email?: string;
  firstName?: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  // ── Validate env vars are configured ────────────────────────────────────────
  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    return new Response(
      JSON.stringify({ error: "Mailing list not configured yet." }),
      { status: 503, headers: corsHeaders }
    );
  }

  // ── Parse and validate request body ─────────────────────────────────────────
  let body: SubscribeBody;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: corsHeaders }
    );
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "Please enter a valid email address." }),
      { status: 400, headers: corsHeaders }
    );
  }

  // ── Call Brevo API ────────────────────────────────────────────────────────────
  try {
    const listId = parseInt(env.BREVO_LIST_ID, 10);

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: body.firstName ? { FIRSTNAME: body.firstName.trim() } : {},
        listIds: [listId],
        updateEnabled: true, // re-adds contacts who previously unsubscribed
      }),
    });

    // 201 = created, 204 = updated (contact already existed, re-added to list)
    if (brevoRes.status === 201 || brevoRes.status === 204) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Brevo returns 400 with code "duplicate_parameter" if already on the list
    if (brevoRes.status === 400) {
      const data = (await brevoRes.json()) as { code?: string };
      if (data.code === "duplicate_parameter") {
        return new Response(
          JSON.stringify({ success: true, alreadySubscribed: true }),
          { status: 200, headers: corsHeaders }
        );
      }
    }

    // Unexpected Brevo error — log status for debugging
    console.error("Brevo unexpected status:", brevoRes.status);
    return new Response(
      JSON.stringify({ error: "Could not subscribe. Please try again." }),
      { status: 502, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Brevo fetch error:", err);
    return new Response(
      JSON.stringify({ error: "Server error. Please try again later." }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle preflight CORS
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
