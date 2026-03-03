// ─── MailerLite Mailing List Subscription ────────────────────────────────────
// Cloudflare Pages Function — runs as an Edge Worker alongside the static site.
// Handles POST /api/subscribe and adds the email to your MailerLite group.
//
// SETUP (one-time, in Cloudflare Pages dashboard):
//   1. Go to app.mailerlite.com → Integrations → API → copy your API token
//   2. In MailerLite: Subscribers → Groups → copy the numeric Group ID
//   3. In Cloudflare Pages → your project → Settings → Environment Variables → Add:
//        MAILERLITE_API_KEY  =  <your MailerLite API token>
//        MAILERLITE_GROUP_ID =  <your MailerLite group ID (e.g. 180953803662558446)>
//   4. Redeploy — the form will go live automatically
//
// The API key stays server-side (never exposed to the browser).
// ─────────────────────────────────────────────────────────────────────────────

interface Env {
  MAILERLITE_API_KEY: string;
  MAILERLITE_GROUP_ID: string;
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
  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_GROUP_ID) {
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

  // ── Call MailerLite API ───────────────────────────────────────────────────────
  try {
    const payload: Record<string, unknown> = {
      email,
      groups: [env.MAILERLITE_GROUP_ID],
    };

    if (body.firstName) {
      payload.fields = { name: body.firstName.trim() };
    }

    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // 200 = existing subscriber updated, 201 = new subscriber created
    if (mlRes.status === 200 || mlRes.status === 201) {
      const data = (await mlRes.json()) as { data?: { status?: string } };
      const alreadySubscribed = mlRes.status === 200 && data.data?.status === "active";
      return new Response(
        JSON.stringify({ success: true, alreadySubscribed }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Unexpected MailerLite error — log for debugging
    const errBody = await mlRes.text();
    console.error("MailerLite unexpected status:", mlRes.status, errBody);
    return new Response(
      JSON.stringify({ error: "Could not subscribe. Please try again." }),
      { status: 502, headers: corsHeaders }
    );
  } catch (err) {
    console.error("MailerLite fetch error:", err);
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
