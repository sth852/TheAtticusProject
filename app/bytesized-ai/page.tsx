"use client";
// ─── Bytesized AI Page ────────────────────────────────────────────────────────
// Displays all Bytesized AI episodes as click-through slideshows.
// Slides are pre-rendered PNGs stored in /public/bytesized-ai/slides/epXX/
//
// TO ADD A NEW EPISODE:
//   1. Convert the PPTX to PNGs (see conversion script in project docs)
//   2. Copy PNGs to /public/bytesized-ai/slides/epXX/slide-01.png, etc.
//   3. Add an entry to the `episodes` array below
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

const episodes = [
  { num: 1,  slug: "ep01", slideCount: 7,  title: "NLP, ML, and AI — Basic Terminology",               desc: "The foundational vocabulary you need: how Natural Language Processing, Machine Learning, and Artificial Intelligence relate to legal work." },
  { num: 2,  slug: "ep02", slideCount: 12, title: "What Can AI Do in Legal?",                          desc: "A practical tour of what AI is doing right now in legal practice — contract review, legal research, and the realistic near-term implications for attorneys." },
  { num: 3,  slug: "ep03", slideCount: 10, title: "Why AI? Why Now?",                                  desc: "What changed, what made large language models possible, and why this moment matters for the legal profession." },
  { num: 4,  slug: "ep04", slideCount: 6,  title: "How Does AI Work? Part I — Pattern Recognition",    desc: "How AI learns from data and makes predictions — the foundations of pattern recognition in plain English." },
  { num: 5,  slug: "ep05", slideCount: 7,  title: "How Does AI Work? Part II — Neural Networks",       desc: "Neural networks explained: layers, training, and why the leap to large language models was so significant." },
  { num: 6,  slug: "ep06", slideCount: 12, title: "OpenAI in a Nutshell",                              desc: "How OpenAI's approach to training on large datasets changed what's possible — and what that means for legal AI tools." },
  { num: 7,  slug: "ep07", slideCount: 16, title: "NLP Deeper Dive",                                   desc: "Tokenization, embeddings, and how AI systems convert text into something they can reason about." },
  { num: 8,  slug: "ep08", slideCount: 12, title: "How to Train AI to Review Contracts",               desc: "What labeled data is, why it's hard to create, and how it teaches AI to find specific clause types in real contracts." },
  { num: 9,  slug: "ep09", slideCount: 14, title: "How to Measure AI Accuracy",                        desc: "Precision, recall, and F1 score in plain English — with contract review as the example. Know what you're trusting before you rely on it." },
  { num: 10, slug: "ep10", slideCount: 9,  title: "AI Glossary (Episodes 1–9)",                        desc: "A consolidated reference covering every technical term from the first nine episodes. A handy cheat sheet to revisit." },
  { num: 11, slug: "ep12", slideCount: 11, title: "Not All Things Require AI",                         desc: "A grounding perspective: when AI adds value versus when traditional approaches are faster, cheaper, and more reliable." },
];

function getAccentColor(num: number) {
  if (num <= 3)  return { bg: "rgba(89,51,170,0.1)",   border: "rgba(89,51,170,0.25)",  text: "#5933aa" };
  if (num <= 6)  return { bg: "rgba(15,52,96,0.1)",    border: "rgba(15,52,96,0.25)",   text: "#0f3460" };
  if (num <= 9)  return { bg: "rgba(0,87,68,0.1)",     border: "rgba(0,87,68,0.25)",    text: "#005744" };
  return               { bg: "rgba(156,185,200,0.2)",  border: "rgba(156,185,200,0.4)", text: "var(--slate-dark)" };
}

// ── Slide Viewer Component ──────────────────────────────────────────────────
function SlideViewer({ episode, onClose }: {
  episode: typeof episodes[0];
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const total = episode.slideCount;

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   prev();
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // Reset to first slide when episode changes
  useEffect(() => { setCurrent(0); }, [episode.slug]);

  const slideUrl = `/bytesized-ai/slides/${episode.slug}/slide-${String(current + 1).padStart(2, "0")}.png`;

  return (
    <div style={{
      background: "var(--ink)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.1)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1.25rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{
            fontSize: "0.68rem", fontWeight: "800", letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--slate)",
            background: "rgba(156,185,200,0.15)", border: "1px solid rgba(156,185,200,0.3)",
            padding: "0.2rem 0.55rem", borderRadius: "3px",
          }}>
            Episode {episode.num}
          </span>
          <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "320px" }}>
            {episode.title}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", cursor: "pointer", padding: "0.25rem 0.5rem" }}
          aria-label="Close viewer"
        >✕</button>
      </div>

      {/* Slide image — 16:9 aspect-ratio container keeps slides from squishing */}
      <div style={{ position: "relative", background: "#f5f5f5", lineHeight: 0, aspectRatio: "16/9", width: "100%", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slideUrl}
          alt={`${episode.title} — slide ${current + 1}`}
          style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
        />

        {/* Prev/Next overlay arrows */}
        {current > 0 && (
          <button
            onClick={prev}
            style={{
              position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.55)", border: "none", borderRadius: "50%",
              width: "40px", height: "40px", cursor: "pointer", color: "white",
              fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
            }}
            aria-label="Previous slide"
          >‹</button>
        )}
        {current < total - 1 && (
          <button
            onClick={next}
            style={{
              position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.55)", border: "none", borderRadius: "50%",
              width: "40px", height: "40px", cursor: "pointer", color: "white",
              fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
            }}
            aria-label="Next slide"
          >›</button>
        )}
      </div>

      {/* Footer controls */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.75rem 1.25rem",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}>
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-sm)",
            color: current === 0 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.8)",
            fontSize: "0.82rem", fontWeight: "600", padding: "0.4rem 1rem", cursor: current === 0 ? "default" : "pointer",
          }}
        >← Prev</button>

        {/* Progress dots (max 12 visible) */}
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {Array.from({ length: Math.min(total, 16) }).map((_, i) => {
            const dotIdx = total <= 16 ? i : Math.round(i * (total - 1) / 15);
            const isActive = total <= 16 ? i === current : Math.round(current * 15 / (total - 1)) === i;
            return (
              <button
                key={i}
                onClick={() => setCurrent(total <= 16 ? i : dotIdx)}
                style={{
                  width: isActive ? "18px" : "6px", height: "6px",
                  borderRadius: "3px", border: "none",
                  background: isActive ? "var(--slate)" : "rgba(255,255,255,0.25)",
                  cursor: "pointer", transition: "all 200ms ease", padding: 0,
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            );
          })}
        </div>

        <button
          onClick={next}
          disabled={current === total - 1}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-sm)",
            color: current === total - 1 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.8)",
            fontSize: "0.82rem", fontWeight: "600", padding: "0.4rem 1rem", cursor: current === total - 1 ? "default" : "pointer",
          }}
        >Next →</button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function BytesizedAIPage() {
  const [activeEp, setActiveEp] = useState<typeof episodes[0] | null>(null);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1d2e50 100%)",
        padding: "5rem 0 4rem",
      }}>
        <div className="container">
          <span className="label-tag label-tag-white">5-Minute Lessons</span>
          <h1 style={{ color: "white", marginTop: "0.5rem", marginBottom: "1rem", maxWidth: "580px", lineHeight: 1.2 }}>
            Bytesized AI
          </h1>
          <div className="divider divider-white" />
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "600px", lineHeight: "1.8", marginTop: "1rem", fontSize: "1rem" }}>
            Short slide decks explaining AI concepts in plain English — designed for legal professionals with no technical background. Click any episode to view it right here.
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.75rem", fontSize: "0.88rem" }}>
            {episodes.length} episodes &middot; use arrow keys to navigate slides
          </p>
        </div>
      </section>

      {/* ── Inline Viewer (shown when episode selected) ───────────────────── */}
      {activeEp && (
        <section data-viewer style={{ background: "#0d1620", padding: "2.5rem 0" }}>
          <div className="container" style={{ maxWidth: "960px" }}>
            <SlideViewer episode={activeEp} onClose={() => setActiveEp(null)} />
          </div>
        </section>
      )}

      {/* ── Episode Grid ──────────────────────────────────────────────────── */}
      <section className="section bg-alt">
        <div className="container">
          {activeEp && (
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
              Viewing <strong>{activeEp.title}</strong> above. Click another episode to switch, or close the viewer.
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1.25rem" }}>
            {episodes.map((ep) => {
              const accent = getAccentColor(ep.num);
              const isActive = activeEp?.slug === ep.slug;
              return (
                <div
                  key={ep.slug}
                  style={{
                    background: "white",
                    border: `1.5px solid ${isActive ? "var(--purple)" : "var(--border)"}`,
                    borderRadius: "var(--radius-md)",
                    padding: "1.5rem",
                    boxShadow: isActive ? "0 0 0 3px rgba(89,51,170,0.12)" : "var(--shadow-sm)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    transition: "border-color 200ms, box-shadow 200ms",
                  }}
                >
                  {/* Episode badge + slide count */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontSize: "0.68rem", fontWeight: "800", letterSpacing: "0.1em",
                      textTransform: "uppercase", color: accent.text,
                      background: accent.bg, border: `1px solid ${accent.border}`,
                      padding: "0.2rem 0.6rem", borderRadius: "3px",
                    }}>
                      Episode {ep.num}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {ep.slideCount} slides
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.02rem", lineHeight: 1.35, color: "var(--ink)", margin: 0 }}>
                    {ep.title}
                  </h3>

                  <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: "1.7", flex: 1, margin: 0 }}>
                    {ep.desc}
                  </p>

                  <button
                    onClick={() => {
                      setActiveEp(isActive ? null : ep);
                      if (!isActive) {
                        // scroll to viewer after state update + render
                        setTimeout(() => {
                          document.querySelector('[data-viewer]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }
                    }}
                    style={{
                      background: isActive ? "var(--purple)" : "var(--ink)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.6rem 1.25rem",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      marginTop: "0.25rem",
                      transition: "background 200ms ease",
                    }}
                  >
                    {isActive ? "✓ Now Viewing" : "▶ View Slideshow"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Subscribe CTA ─────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink-mid) 0%, var(--ink) 100%)",
        padding: "5rem 0",
        textAlign: "center",
      }}>
        <div className="container">
          <span className="label-tag label-tag-white">Stay in the Loop</span>
          <h2 style={{ color: "white", marginTop: "0.25rem", marginBottom: "1rem" }}>Follow Our Work</h2>
          <div className="divider divider-center divider-white" />
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "520px", margin: "0 auto 2rem", lineHeight: "1.75", fontSize: "0.95rem" }}>
            Subscribe to FairlyAI — our free weekly newsletter on AI and law for attorneys.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://weichen221.substack.com/" target="_blank" rel="noopener noreferrer" className="btn btn-white">
              Subscribe to FairlyAI →
            </a>
            <Link href="/education" className="btn btn-outline-white">
              All Education
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
