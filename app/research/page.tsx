// ─── Research Overview Page ───────────────────────────────────────────────────
// Shows all three datasets (CUAD, MAUD, ACORD) with stats, descriptions, and
// example output boxes. The `datasets` array at the top controls all content.
//
// QUICK EDITS:
//   - Change dataset descriptions: edit the `desc` field in the `datasets` array
//   - Change stats: edit the `stats` array within each dataset object
//   - Add a new dataset: copy one of the dataset objects and update all fields
//   - Example output items: edit the `example.items` array for each dataset
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | The Atticus Project",
};

import Link from "next/link";

const datasets = [
  {
    name: "CUAD",
    full: "Contract Understanding Atticus Dataset",
    stats: [
      { num: "510+", label: "Contracts" },
      { num: "13,000+", label: "Expert Labels" },
      { num: "41", label: "Clause Types" },
    ],
    desc: "CUAD is an expert-annotated dataset that helps AI identify the most critical parts of legal contracts. Built from 510+ contracts with 13,000+ labels across 41 clause types, it teaches models to highlight key terms — speeding up contract review and making it easier to catch red flags.",
    venue: "NeurIPS 2021",
    href: "/cuad",
    example: {
      title: "Example Output",
      items: [
        { type: "normal", text: "Governing Law: \"This Agreement shall be governed by the laws of the State of California...\" (Page 2)" },
        { type: "warn", text: "⚠ Covenant Not to Sue: \"In addition, Company shall not now or in the future contest the validity...\" (Page 30)" },
        { type: "danger", text: "► Perpetual / Irrevocable License: \"Company grants to Investor a worldwide, royalty-free, exclusive...\" (Page 151)" },
      ],
    },
  },
  {
    name: "MAUD",
    full: "Merger Agreement Understanding Dataset",
    stats: [
      { num: "152", label: "Agreements" },
      { num: "47,000+", label: "Expert Labels" },
      { num: "92", label: "Deal Point Questions" },
    ],
    desc: "MAUD is an expert-annotated reading comprehension dataset built from the ABA's Public Target Deal Points Study. It turns real M&A deal points into clear questions and answers, giving legal-tech tools a reliable way to read and interpret key terms at scale.",
    venue: "EMNLP 2023",
    href: "/maud",
    example: {
      title: "Example Output",
      items: [
        { type: "normal", text: "Question: What ordinary course representations are made?" },
        { type: "positive", text: "☑ Business and operation of Target" },
        { type: "positive", text: "☑ Ability to consummate transaction" },
        { type: "negative", text: "☐ Conduct of Target in compliance with law" },
      ],
    },
  },
  {
    name: "ACORD",
    full: "Atticus Clause Retrieval Dataset",
    stats: [
      { num: "126,000+", label: "Query-Clause Pairs" },
      { num: "114", label: "Legal Queries" },
      { num: "1st", label: "Expert-Annotated Retrieval Dataset" },
    ],
    desc: "ACORD is the first expert-annotated dataset built to help AI find the right legal contract clauses. It includes real lawyer-written queries and thousands of rated clauses — making it easier to draft and review complex provisions like Limitation of Liability and Indemnification.",
    venue: "ACL 2025",
    href: "/acord",
    example: {
      title: "Example Output",
      items: [
        { type: "query", text: "🔍 Query: Termination for Convenience Clause?" },
        { type: "result", text: "1. Either Party may terminate this Agreement at any time upon 30 days written notice..." },
        { type: "result", text: "2. Both parties shall have the right to terminate this Agreement without cause..." },
        { type: "result", text: "3. Either Party may terminate this Agreement or all/part of a Project upon notice..." },
      ],
    },
  },
];

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1a2a4a 100%)",
        padding: "5rem 0 4rem",
      }}>
        <div className="container">
          <div style={{ maxWidth: "680px" }}>
            <span className="label-tag label-tag-white">Research</span>
            <h1 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: "700",
              color: "white",
              lineHeight: 1.15,
              margin: "0.5rem 0 1.25rem",
            }}>
              Open-Source Legal AI Research
            </h1>
            <div className="divider" />
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.75",
              maxWidth: "560px",
            }}>
              We partner with experienced attorneys at leading in-house legal departments to create expert-annotated datasets and benchmarks — advancing the science of AI in legal practice.
            </p>
          </div>
        </div>
      </section>

      {/* Dataset sections */}
      {datasets.map((ds, i) => (
        <section
          key={ds.name}
          className="section"
          style={{ background: i % 2 === 0 ? "var(--off-white)" : "white" }}
        >
          <div className="container">
            {/* Header */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "2.8rem",
                fontWeight: "800",
                color: "var(--ink)",
              }}>{ds.name}</span>
              <span style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.75rem",
                fontWeight: "700",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "white",
                background: "var(--ink-mid)",
                padding: "0.25rem 0.65rem",
                borderRadius: "3px",
              }}>{ds.venue}</span>
            </div>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "var(--text-muted)",
              letterSpacing: "0.03em",
              marginBottom: "2.5rem",
            }}>{ds.full}</p>

            {/* Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginBottom: "2.5rem",
              maxWidth: "600px",
            }}>
              {ds.stats.map(s => (
                <div key={s.label} style={{
                  background: "var(--ink)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem",
                  textAlign: "center",
                }}>
                  <div className="stat-num" style={{ color: "var(--slate)", fontSize: "1.5rem" }}>{s.num}</div>
                  <div className="stat-label" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Body + Example */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.97rem",
                  color: "var(--text-body)",
                  lineHeight: "1.8",
                  marginBottom: "2rem",
                }}>{ds.desc}</p>
                <Link href={ds.href} className="btn btn-dark">
                  Explore {ds.name} →
                </Link>
              </div>

              <div style={{
                background: "var(--ink)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
                border: "1px solid rgba(156,185,200,0.12)",
              }}>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.65rem",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--slate)",
                  marginBottom: "1rem",
                }}>{ds.example.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {ds.example.items.map((item, j) => (
                    <p key={j} style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.82rem",
                      lineHeight: "1.6",
                      color: item.type === "warn" ? "#f5c842"
                        : item.type === "danger" ? "#f87171"
                        : item.type === "positive" ? "#86efac"
                        : item.type === "negative" ? "rgba(255,255,255,0.4)"
                        : item.type === "query" ? "var(--slate)"
                        : item.type === "result" ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.65)",
                      paddingLeft: item.type === "result" ? "1rem" : "0",
                      borderLeft: item.type === "result" ? "2px solid rgba(156,185,200,0.25)" : "none",
                    }}>{item.text}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ background: "var(--slate-pale)", padding: "5rem 0", textAlign: "center" }}>
        <div className="container">
          <span className="label-tag">Get the Data</span>
          <h2 style={{ marginTop: "0.25rem", marginBottom: "1rem" }}>Access Our Datasets</h2>
          <div className="divider divider-center" />
          <p style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto 2.25rem", lineHeight: "1.75", fontSize: "0.95rem" }}>
            All datasets are free and open-source. Download from Hugging Face or explore the research on arXiv.
          </p>
          <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://huggingface.co/TheAtticusProject" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Hugging Face →
            </a>
            <Link href="/contact" className="btn btn-outline-dark">Contact the Team</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .research-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
