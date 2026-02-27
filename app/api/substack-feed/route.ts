// ─── Substack RSS Proxy + Parser ─────────────────────────────────────────────
// Fetches the Substack RSS feed server-side (bypasses CORS), parses it with
// regex (avoids namespace issues with browser DOMParser), and returns clean
// JSON ready for the client to render.
//
// Substack RSS structure per item:
//   <title><![CDATA[...]]></title>
//   <link>...</link>
//   <pubDate>...</pubDate>
//   <description><![CDATA[short subtitle — often empty or just a date]]></description>
//   <content:encoded><![CDATA[full article HTML]]></content:encoded>
//   <media:content url="https://..." medium="image" />    ← cover image
//   <enclosure url="..." type="image/jpeg" />             ← fallback cover
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "nodejs";

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
  const re = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`, "i");
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

export async function GET() {
  try {
    const res = await fetch("https://weichen221.substack.com/feed", {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RSS reader)" },
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch feed" }, { status: 502 });
    }

    const xml = await res.text();

    // Split into individual <item> blocks
    const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    const articles = itemBlocks.slice(0, 4).map((item) => {
      // Title
      const title = decodeEntities(extractCdata("title", item));

      // Link — Substack puts it as plain text between tags (not CDATA)
      const linkMatch = item.match(/<link>(https?:\/\/[^<]+)<\/link>/i);
      const link = linkMatch ? linkMatch[1].trim() : "";

      // Date
      const pubDateRaw = extractCdata("pubDate", item) ||
        (item.match(/<pubDate>([^<]+)<\/pubDate>/i)?.[1] ?? "");
      const pubDate = pubDateRaw
        ? new Date(pubDateRaw).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          })
        : "";

      // Cover image — try media:content, then enclosure, then first <img> in content
      const image =
        extractAttr("media:content", "url", item) ??
        extractAttr("enclosure", "url", item) ??
        (() => {
          const encoded = extractCdata("content:encoded", item);
          const m = encoded.match(/<img[^>]+src=["']([^"']+)["']/i);
          return m ? m[1] : null;
        })();

      // Excerpt — prefer content:encoded (full article) over description (subtitle)
      const contentEncoded = extractCdata("content:encoded", item);
      const descriptionRaw = extractCdata("description", item);
      const bodyHtml = contentEncoded || descriptionRaw;
      const plainText = decodeEntities(stripHtml(bodyHtml));
      // Take first 260 chars, breaking at a word boundary
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
