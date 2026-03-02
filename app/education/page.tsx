"use client";
// ─── Education Page ───────────────────────────────────────────────────────────
// PAGE SECTIONS (in order):
//   1. Hero             - Dark header
//   2. FairlyAI Blog    - Substack RSS feed + subscribe embed
//   (new) Mailing List  - General mailing list signup via Brevo (/api/subscribe)
//   3. Executive Courses - Berkeley/Stanford course cards with registration links
//   4. Corporate Workshops - Description + PDF flyer + link to /workshops form
//   5. Bytesized AI CTA - Separate program explanation with link to /bytesized-ai
//
// QUICK EDITS:
//   - Substack RSS URL: weichen221.substack.com/feed
//   - Course registration links: search "REGISTER_URL" below and replace with actual URLs
//   - Course images: add image files to /public and update src in course card objects
//   - Workshop form: now lives at /workshops (separate page)
// ──────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import { useState, useEffect } from "react";

// Component to fetch and display recent Substack articles from RSS
type ArticleData = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image: string | null;
};

function SubstackFeed() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/substack-feed")
      .then((r) => r.json())
      .then((data) => {
        if (data.articles?.length) {
          setArticles(data.articles);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            background: "var(--gray-100)",
            borderRadius: "var(--radius-md)",
            height: "100px",
            animation: "pulse 2s infinite"
          }} />
        ))}
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div style={{
        background: "var(--gray-100)",
        borderRadius: "var(--radius-md)",
        padding: "2rem",
        textAlign: "center"
      }}>
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
          Unable to load recent articles. Visit Substack to read the latest posts.
        </p>
        <a href="https://weichen221.substack.com/" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
          Read on Substack →
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {articles.map((article) => (
        <a
          key={article.link}
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--purple)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Cover image */}
          {article.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={article.image}
              alt=""
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "var(--radius-sm)",
                flexShrink: 0,
              }}
            />
          )}

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.35rem" }}>
              <h4 style={{ margin: 0, fontSize: "0.92rem", fontWeight: "600", color: "var(--ink)", lineHeight: "1.4" }}>
                {article.title}
              </h4>
              <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>
                {article.pubDate}
              </div>
            </div>
            <p style={{
              margin: 0,
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              lineHeight: "1.55",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {article.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

// Click-through viewer for the 4-page workshop flyer
function FlyerViewer() {
  const pages = [
    "/workshop-flyer/page-1.png",
    "/workshop-flyer/page-2.png",
    "/workshop-flyer/page-3.png",
    "/workshop-flyer/page-4.png",
  ];
  const [current, setCurrent] = useState(0);
  const total = pages.length;

  return (
    <div style={{
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      border: "1px solid var(--border)",
      background: "var(--off-white)",
    }}>
      {/* Image with overlay nav arrows */}
      <div style={{ position: "relative", background: "#f0f0f0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pages[current]}
          alt={`Workshop flyer page ${current + 1} of ${total}`}
          style={{ width: "100%", display: "block" }}
        />

        {/* Prev arrow */}
        {current > 0 && (
          <button
            onClick={() => setCurrent(c => c - 1)}
            aria-label="Previous page"
            style={{
              position: "absolute", top: "50%", left: "0.75rem",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.55)", color: "white",
              border: "none", borderRadius: "50%",
              width: "36px", height: "36px",
              fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >‹</button>
        )}

        {/* Next arrow */}
        {current < total - 1 && (
          <button
            onClick={() => setCurrent(c => c + 1)}
            aria-label="Next page"
            style={{
              position: "absolute", top: "50%", right: "0.75rem",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.55)", color: "white",
              border: "none", borderRadius: "50%",
              width: "36px", height: "36px",
              fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >›</button>
        )}
      </div>

      {/* Footer: dot indicators + page count + download */}
      <div style={{
        padding: "0.75rem 1rem",
        background: "white",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to page ${i + 1}`}
              style={{
                width: i === current ? "18px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? "var(--ink)" : "var(--gray-300)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Page {current + 1} of {total}
          </span>
          <a
            href="/workshop-flyer.pdf"
            download
            style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--purple)", textDecoration: "none" }}
          >
            Download PDF ↓
          </a>
        </div>
      </div>
    </div>
  );
}

export default function EducationPage() {
  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 100%)",
        padding: "5rem 0 4rem",
        color: "white",
      }}>
        <div className="container">
          <span className="label-tag label-tag-white">Education &amp; Outreach</span>
          <h1 style={{ color: "white", marginTop: "0.25rem", maxWidth: "620px" }}>
            Learning at the Intersection of AI and Law
          </h1>
          <div className="divider divider-white" style={{ marginTop: "1.25rem" }} />
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "600px", lineHeight: "1.8", marginTop: "1rem", fontSize: "1rem" }}>
            As a non-profit, we focus on the intersection of artificial intelligence and law. We share knowledge through blogs, executive courses, workshops, and hands-on learning experiences for legal professionals at all levels.
          </p>
        </div>
      </section>

      {/* ── FairlyAI Blog ───────────────────────────────────── */}
      <section id="blog" className="section bg-white">
        <div className="container">
          {/* Section header */}
          <div style={{ marginBottom: "3rem" }}>
            <span className="label-tag">Weekly Publication</span>
            <h2 style={{ marginTop: "0.25rem", maxWidth: "480px" }}>FairlyAI Weekly Blog</h2>
            <div className="divider" />
            <p style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "0.95rem", maxWidth: "600px" }}>
              Stay current with legal AI developments through our weekly newsletter covering AI tools and tactics for legal professionals, practical guidance on emerging legal tech trends, and lessons learned from building real AI datasets with lawyers.
            </p>
          </div>

          {/* Two columns: articles left, subscribe right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>
            {/* Recent articles feed */}
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-muted)" }}>
                Recent Articles
              </h3>
              <SubstackFeed />
              <a href="https://weichen221.substack.com/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "1.25rem", fontSize: "0.85rem", fontWeight: "700", color: "var(--purple)", textDecoration: "none" }}>
                View all articles on Substack →
              </a>
            </div>

            {/* Subscribe sidebar */}
            <div style={{
              background: "var(--off-white)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "1.75rem",
            }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                Subscribe to FairlyAI
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
                Free weekly insights on AI and law, straight to your inbox.
              </p>
              <iframe
                src="https://weichen221.substack.com/embed"
                width="100%"
                height="160"
                style={{ border: "none", borderRadius: "var(--radius-sm)", background: "white", display: "block" }}
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Executive Courses ───────────────────────────────── */}
      <section id="courses" className="section bg-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="label-tag">MCLE Accredited</span>
            <h2 style={{ marginTop: "0.25rem" }}>Executive Education Courses</h2>
            <div className="divider divider-center" />
            <p style={{ color: "var(--text-muted)", maxWidth: "540px", margin: "0 auto", fontSize: "0.95rem", lineHeight: "1.75" }}>
              Continuing legal education developed with leading law schools. These practical, accredited courses are built for today's legal professional.
            </p>
          </div>

          {/*
            Course cards — update registerUrl with the exact registration page links.
            Images are loaded from /public. Replace image file names if needed.
          */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                schoolBg: "#003262",
                schoolAccent: "#FDB515",
                schoolName: "UC Berkeley Law Executive Education",
                title: "Generative AI for the Legal Profession",
                desc: "A practical crash course to help lawyers understand generative AI and use it responsibly. Explore AI tools and discover how to balance AI's benefits with risks like hallucinations and confidentiality.",
                registerUrl: "https://executive.law.berkeley.edu/programs/generative-ai-for-the-legal-profession/",
              },
              {
                schoolBg: "#003262",
                schoolAccent: "#FDB515",
                schoolName: "UC Berkeley Law Executive Education",
                title: "Commercial Contract Fundamentals",
                desc: "Master the essentials of commercial contracts to negotiate with confidence and reduce risk. Led by Wei Chen, CLO at Infoblox, using real-world examples to demystify legal terms.",
                registerUrl: "https://executive.law.berkeley.edu/programs/commercial-contract-fundamentals/",
              },
              {
                schoolBg: "#8C1515",
                schoolAccent: "white",
                schoolName: "Stanford Law Executive Education",
                title: "AI Strategy for Legal Leaders",
                desc: "Develop the strategic insight to lead in the era of generative AI. This course helps legal executives guide responsible AI adoption and become trusted strategic partners to the C-suite.",
                registerUrl: "https://law.stanford.edu/executive-education/ai-strategy-for-legal-leaders/",
              },
            ].map((course) => (
              <div key={course.title} style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                background: "white",
                display: "flex",
                flexDirection: "column",
              }}>
                {/* School text header */}
                <div style={{
                  backgroundColor: course.schoolBg,
                  padding: "1.75rem 1.5rem",
                  textAlign: "center",
                }}>
                  <p style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.15rem",
                    fontWeight: "700",
                    color: course.schoolAccent,
                    margin: 0,
                    lineHeight: 1.35,
                  }}>
                    {course.schoolName}
                  </p>
                </div>

                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "0.75rem" }}>{course.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: "1.75", marginBottom: "1.25rem", flex: 1 }}>
                    {course.desc}
                  </p>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <span style={{
                      background: "#0f1b2d", color: "white",
                      fontSize: "0.72rem", fontWeight: "700",
                      padding: "0.3rem 0.75rem", borderRadius: "4px", letterSpacing: "0.06em"
                    }}>MCLE Accredited</span>
                  </div>
                  <a href={course.registerUrl} target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline-dark" style={{ textAlign: "center", justifyContent: "center" }}>
                    View &amp; Register →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Corporate Workshops ─────────────────────────────── */}
      <section id="workshops" className="section bg-white">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            {/* Left copy */}
            <div>
              <span className="label-tag">For Legal Teams</span>
              <h2 style={{ marginTop: "0.25rem", marginBottom: "1rem" }}>Corporate AI Workshops</h2>
              <div className="divider" />
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
                Bring The Atticus Project directly to your legal team. Our tailored corporate workshops help in-house counsel and law firm attorneys understand, evaluate, and deploy AI tools with confidence.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Led by practicing attorneys and AI researchers, sessions are customized to your organization's size, practice areas, and AI maturity level. Whether you're just getting started or looking to level up a sophisticated team, we build a program around your goals.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                {[
                  "A day in the life of an AI-enabled attorney: what the future looks like now",
                  "How to evaluate AI tools before adopting them for your practice",
                  "AI risk management: confidentiality, hallucinations, and what can go wrong",
                  "Deep research with AI: getting reliable answers from complex legal questions",
                  "Understanding AI outputs: when to trust it and when to push back",
                  "Building AI habits that stick across your legal team",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--slate-dark)", marginTop: "0.5rem", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.9rem", color: "var(--text-body)", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* CTA — naturally follows the bullet list */}
              <Link href="/workshops" className="btn btn-dark" style={{ alignSelf: "flex-start" }}>
                Request a Workshop →
              </Link>
            </div>

            {/* Right – Flyer Viewer only */}
            <div>
              <FlyerViewer />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mailing List ─────────────────────────────────────── */}
      <MailingListSection />

      <style>{`
        @media (max-width: 768px) {
          #blog > div > div,
          #workshops > div > div { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

// ─── Mailing List Section ────────────────────────────────────────────────────
// Submits to /api/subscribe (functions/api/subscribe.ts — Cloudflare Pages Function)
// which securely forwards the email to Brevo.
function MailingListSection() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await res.json() as { success?: boolean; alreadySubscribed?: boolean; error?: string };

      if (data.success && data.alreadySubscribed) {
        setStatus("already");
      } else if (data.success) {
        setStatus("success");
        setEmail("");
        setFirstName("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section style={{
      background: "linear-gradient(135deg, var(--ink) 0%, #162038 100%)",
      padding: "5rem 0",
    }}>
      <div className="container">
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}>
          <span className="label-tag label-tag-white">Stay Connected</span>
          <h2 style={{ color: "white", marginTop: "0.25rem", marginBottom: "1rem" }}>
            Join Our Mailing List
          </h2>
          <div className="divider divider-center divider-white" />
          <p style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "0.95rem",
            lineHeight: "1.75",
            marginBottom: "2.5rem",
          }}>
            Get updates on new research, AI education programs, and events from The Atticus Project — straight to your inbox.
          </p>

          {status === "success" ? (
            <div style={{
              background: "rgba(156,185,200,0.12)",
              border: "1px solid rgba(156,185,200,0.3)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              color: "white",
            }}>
              <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>✓</p>
              <p style={{ fontWeight: "700", fontSize: "1.05rem", marginBottom: "0.25rem" }}>You&apos;re on the list!</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>Thanks for subscribing. We&apos;ll be in touch.</p>
            </div>
          ) : status === "already" ? (
            <div style={{
              background: "rgba(156,185,200,0.12)",
              border: "1px solid rgba(156,185,200,0.3)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              color: "white",
            }}>
              <p style={{ fontWeight: "700", fontSize: "1.05rem", marginBottom: "0.25rem" }}>Already subscribed!</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>This email is already on our list. We&apos;ll keep you posted.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid rgba(156,185,200,0.25)",
                    background: "rgba(255,255,255,0.07)",
                    color: "white",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email address *"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid rgba(156,185,200,0.25)",
                    background: "rgba(255,255,255,0.07)",
                    color: "white",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-slate"
                style={{ width: "100%", opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "wait" : "pointer" }}
              >
                {status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
              {status === "error" && (
                <p style={{ color: "#f87171", fontSize: "0.85rem", margin: 0 }}>{errorMsg}</p>
              )}
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", margin: 0 }}>
                No spam. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
