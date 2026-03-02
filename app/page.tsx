// ─── Home Page ────────────────────────────────────────────────────────────────
// The site's landing page — the first thing visitors see at atticusprojectai.org
//
// PAGE SECTIONS (in order):
//   1. Hero              - Logo, tagline, and two CTA buttons
//   2. Stats Bar         - Four key numbers (contracts, labels, clause types, datasets)
//   3. Mission Cards     - "What We Do" — Expert Research, How to Participate, AI Education
//   4. Datasets Showcase - Dark section previewing CUAD, MAUD, ACORD
//   5. Courses & Workshops - MCLE course cards (Berkeley/Stanford) + Corporate Workshops banner
//   6. Join CTA          - "Get Involved" with Support Us + Contact Us buttons
//
// QUICK EDITS:
//   - Stats bar numbers: find the array with "510+", "13,000+", "41", "3" below
//   - Mission card text: find the array with "Expert Research", "How to Participate"
//   - Datasets card text: find the array with "CUAD", "MAUD", "ACORD"
//   - CTA buttons: find the <Link> tags at the bottom of each section
//   - Logo image: stored in /public/AtticusLogo.avif
//
// NOTE: This page is a "use client" component (needed for hover animations).
//   To change the browser tab title, update `metadata.title` in app/layout.tsx.
// ──────────────────────────────────────────────────────────────────────────────
"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1a2a4a 100%)",
        padding: "6rem 0 5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(156,185,200,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(89,51,170,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left – logo */}
            <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", inset: "-20px",
                  background: "radial-gradient(circle, rgba(156,185,200,0.12) 0%, transparent 70%)",
                  borderRadius: "50%",
                }} />
                <Image
                  src="/AtticusLogo.avif"
                  alt="The Atticus Project"
                  width={260}
                  height={260}
                  style={{ objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 8px 40px rgba(156,185,200,0.20))" }}
                  priority
                />
              </div>
            </div>

            {/* Right – copy */}
            <div>
              <p className="animate-fade-up" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--slate)", marginBottom: "1rem" }}>
                Non-Profit · AI &amp; Law · Open Source
              </p>
              <h1 className="animate-fade-up-delay-1" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: "700", color: "white", lineHeight: 1.12, marginBottom: "1.5rem" }}>
                Advancing AI<br />
                <span style={{ color: "var(--slate)" }}>Performance</span><br />
                in the Legal Space
              </h1>
              <p className="animate-fade-up-delay-2" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: "1.75", maxWidth: "480px", marginBottom: "2.25rem" }}>
                The Atticus Project brings together experienced attorneys from leading in-house legal departments to build open-source datasets, benchmark AI tools, and advance practical AI education for the legal profession.
              </p>
              <div className="animate-fade-up-delay-3" style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                <Link href="/research" className="btn btn-white">Explore Research</Link>
                <Link href="/support-us" className="btn btn-outline-white">Support Our Work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <section style={{ background: "var(--ink-mid)", borderBottom: "1px solid rgba(156,185,200,0.10)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "1.75rem 0" }}>
            {[
              { num: "510+", label: "Legal Contracts" },
              { num: "13,000+", label: "Expert Labels" },
              { num: "41", label: "Clause Types" },
              { num: "3", label: "Open Datasets" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none", padding: "0.5rem" }}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Cards ─────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="label-tag">What We Do</span>
            <h2 style={{ marginTop: "0.25rem" }}>Legal AI, Built by Lawyers</h2>
            <div className="divider divider-center" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                title: "Expert Research",
                body: "We create open-source datasets and benchmarks with 13,000+ expert annotations across legal contracts, merger agreements, and clause retrieval to enable the next generation of legal AI.",
                link: { href: "/research", label: "View Research →" },
              },
              {
                title: "How to Participate",
                body: "We're building the infrastructure for AI in legal practice. If you're an attorney, researcher, or legal tech builder, there are many ways to get involved.",
                link: { href: "/contact", label: "Get in Touch →" },
              },
              {
                title: "AI Education",
                body: "AI education is at the core of The Atticus Project. We help everyone from law students to general counsels develop practical AI skills for the modern legal workplace.",
                link: { href: "/education", label: "Explore Education →" },
              },
            ].map((card) => (
              <div key={card.title} className="card-accent" style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ marginBottom: "0.75rem" }}>{card.title}</h3>
                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.75", flex: 1, marginBottom: "1.25rem" }}>{card.body}</p>
                <a href={card.link.href} style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", fontWeight: "700", color: "var(--slate-dark)", letterSpacing: "0.02em" }}>
                  {card.link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Datasets Showcase ─────────────────────────────────── */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--ink) 0%, #162038 100%)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="label-tag label-tag-white">Open-Source Datasets</span>
            <h2 style={{ color: "white", marginTop: "0.25rem" }}>Our Research Portfolio</h2>
            <div className="divider divider-center divider-white" />
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "520px", margin: "0 auto", fontSize: "0.95rem", lineHeight: "1.75" }}>
              Three landmark datasets built by legal experts to advance AI in contract review, M&amp;A, and clause retrieval.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                name: "CUAD",
                full: "Contract Understanding Atticus Dataset",
                stats: "510 contracts · 13,000+ labels · 41 clause types",
                desc: "Expert-annotated dataset that teaches AI to identify critical legal clauses and red flags in commercial contracts.",
                href: "/cuad",
              },
              {
                name: "MAUD",
                full: "Merger Agreement Understanding Dataset",
                stats: "152 agreements · 47,000+ labels · 92 questions",
                desc: "Built from the ABA's Public Target Deal Points Study, enabling AI to accurately parse complex M&A deal terms.",
                href: "/maud",
              },
              {
                name: "ACORD",
                full: "Atticus Clause Retrieval Dataset",
                stats: "126,000+ query-clause pairs · 114 queries",
                desc: "The first expert-annotated dataset for AI-powered legal clause retrieval — Limitation of Liability, Indemnification, and more.",
                href: "/acord",
              },
            ].map((ds) => (
              <Link key={ds.name} href={ds.href} style={{ textDecoration: "none" }}>
                <div className="card-dark" style={{ height: "100%", cursor: "pointer", transition: "transform 220ms ease, box-shadow 220ms ease", borderRadius: "var(--radius-md)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: "800", color: "var(--slate)" }}>{ds.name}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", fontWeight: "600", color: "rgba(156,185,200,0.7)", letterSpacing: "0.03em", marginBottom: "0.25rem" }}>{ds.full}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "1rem", letterSpacing: "0.02em" }}>{ds.stats}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(255,255,255,0.62)", lineHeight: "1.7", marginBottom: "1.25rem" }}>{ds.desc}</p>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", fontWeight: "700", color: "var(--slate)", letterSpacing: "0.04em" }}>Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses & Workshops ───────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="label-tag">Professional Development</span>
            <h2 style={{ marginTop: "0.25rem" }}>Courses &amp; Workshops</h2>
            <div className="divider divider-center" />
          </div>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/education#courses" className="btn btn-dark">MCLE Courses</Link>
            <Link href="/workshops" className="btn btn-outline-dark">Corporate Workshops</Link>
          </div>
        </div>
      </section>

      {/* ── Join CTA ──────────────────────────────────────────── */}
      <section style={{ background: "var(--slate-pale)", padding: "5rem 0", textAlign: "center" }}>
        <div className="container">
          <span className="label-tag">Get Involved</span>
          <h2 style={{ marginTop: "0.25rem", marginBottom: "1rem" }}>Get Involved</h2>
          <div className="divider divider-center" />
          <p style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto 2.25rem", lineHeight: "1.75", fontSize: "0.95rem" }}>
            Help us change the legal industry forever. Your support makes our open-source legal AI research possible.
          </p>
          <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/support-us" className="btn btn-dark">Support Us</Link>
            <Link href="/contact" className="btn btn-outline-dark">Contact Us</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section:first-of-type > div > div { grid-template-columns: 1fr !important; }
          section:first-of-type > div > div > div:first-child { display: none !important; }
          section:nth-of-type(2) > div > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          section:nth-of-type(2) > div > div { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
