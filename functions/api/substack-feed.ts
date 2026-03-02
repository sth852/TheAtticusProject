// ─── Substack RSS Proxy — Cloudflare Pages Function ──────────────────────────
// Replaces app/api/substack-feed/route.ts (incompatible with static export).
// Fetches the Substack RSS feed server-side (bypasses CORS), parses it, and
// returns clean JSON. Called by the SubstackFeed component in education/page.tsx.
// ─────────────────────────────────────────────────────────────────────────────

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&#x2019;/g, "\u2019")
    .replace(/&#8216;|&#x2018;/g, "\u2018")
    .replace(/&#8220;|&#x201C;/g, "\u201C")
    .replace(/&#8221;|&#x201D;/g, "\u201D")
    .replace(/&#8211;|&#x2013;/g, "\u2013")
    .replace(/&#8212;|&#x2014;/g, "\u2014")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, "")
    .replace(/&#x[\da-fA-F]+;/g, "");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractCdata(tag: string, xml: string): string {
  const re = new RegExp(
    `<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`,
    "i"
  );
  const m = xml.match(re);
  if (m) return m[1];
  const re2 = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m2 = xml.match(re2);
  return m2 ? m2[1].trim() : "";
}

function extractAttr(tag: string, attr: string, xml: string): string | null {
  const re = new RegExp(`<${tag}[^>]+${attr}=["']([^"']+)["']`, "i");
  const m = xml.match(re);
  return m ? m[1] : null;
}

export async function onRequestGet(): Promise<Response> {
  try {
    const res = await fetch("https://weichen221.substack.com/feed", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RSS reader)" },
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch feed" }, { status: 502 });
    }

    const xml = await res.text();
    const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    const articles = itemBlocks.slice(0, 4).map((item) => {
      const title = decodeEntities(extractCdata("title", item));

      const linkMatch = item.match(/<link>(https?:\/\/[^<]+)<\/link>/i);
      const link = linkMatch ? linkMatch[1].trim() : "";

      const pubDateRaw =
        extractCdata("pubDate", item) ||
        (item.match(/<pubDate>([^<]+)<\/pubDate>/i)?.[1] ?? "");
      const pubDate = pubDateRaw
        ? new Date(pubDateRaw).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";

      const image =
        extractAttr("media:content", "url", item) ??
        extractAttr("enclosure", "url", item) ??
        (() => {
          const encoded = extractCdata("content:encoded", item);
          const m = encoded.match(/<img[^>]+src=["']([^"']+)["']/i);
          return m ? m[1] : null;
        })();

      const contentEncoded = extractCdata("content:encoded", item);
      const descriptionRaw = extractCdata("description", item);
      const bodyHtml = contentEncoded || descriptionRaw;
      const plainText = decodeEntities(stripHtml(bodyHtml));
      const excerpt =
        plainText.length > 260
          ? plainText.substring(0, 260).replace(/\s\S*$/, "") + "\u2026"
          : plainText;

      return { title, link, pubDate, image, description: excerpt };
    });

    return Response.json(
      { articles },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      }
    );
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
