// ─── CUAD Dataset Page ─────────────────────────────────────────────────────────
// Contract Understanding Atticus Dataset — 510 contracts, 13,000+ labels, 41 clause types.
//
// QUICK EDITS:
//   - Stat pills: edit the `stats` array
//   - Description paragraphs: edit `bodyParas`
//   - Dataset card links: edit `datasetCard`
//   - Publication details: edit `publication`
//   - Contributors: edit the `contributors` array
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CUAD Dataset | The Atticus Project",
};

import Link from "next/link";

export default function CUADPage() {
  const stats = ["510 contracts", "13,000+ labels", "41 clause types", "CC BY 4.0"];

  const contributors = [
    {
      title: "Attorney Advisors",
      names: ["Wei Chen", "John Brockland", "Kevin Chen", "Jacky Fink", "Spencer P. Goodson", "Justin Haan", "Alex Haskell", "Kari Krusmark", "Jenny Lin", "Jonas Marson", "Benjamin Petersen", "Alexander Kwonji Rosenberg", "William R. Sawyers", "Brittany Schmeltz", "Max Scott", "Zhu Zhu"],
    },
    {
      title: "Law Student Leaders",
      names: ["John Batoha", "Daisy Beckner", "Lovina Consunji", "Gina Diaz", "Chris Gronseth", "Calvin Hannagan", "Joseph Kroon", "Sheetal Sharma Saran"],
    },
    {
      title: "Law Student Contributors",
      names: ["Scott Aronin", "Bryan Burgoon", "Jigar Desai", "Imani Haynes", "Philip Katz", "Jeongsoo Kim", "Margaret Lynch", "Allison Melville", "Felix Mendez-Burgos", "Nicole Mirkazemi", "David Myers", "Emily Rissberger", "Behrang Seraj", "Sarahginy Valcin"],
    },
    {
      title: "Technical Advisors",
      names: ["Dan Hendrycks", "Collin Burns", "Spencer Ball", "Anya Chen"],
    },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1a2a4a 100%)", padding: "4rem 0" }}>
        <div className="container">
          <span className="label-tag label-tag-white" style={{ marginBottom: "1.5rem", display: "inline-block" }}>
            Dataset 01
          </span>

          <h1 style={{ color: "white", marginBottom: "1rem", fontSize: "2.75rem", fontWeight: "800", lineHeight: "1.2" }}>
            Contract Understanding<br />Atticus Dataset{" "}
            <span style={{ color: "var(--slate)" }}>(CUAD)</span>
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
            {stats.map(s => (
              <span key={s} style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "0.6rem 1rem",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}>{s}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {[
              { href: "#dataset", label: "Dataset" },
              { href: "#publication", label: "Publication" },
              { href: "https://github.com/TheAtticusProject/cuad", label: "Code ↗" },
              { href: "#contributors", label: "Contributors" },
            ].map(t => (
              <a key={t.label} href={t.href} style={{
                color: "#fff",
                padding: "0.7rem 1.2rem",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                fontSize: "0.9rem",
                fontWeight: "500",
                textDecoration: "none",
                transition: "background 0.2s",
              }}>{t.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3.5rem", alignItems: "start" }}>

            {/* Left — description */}
            <div>
              <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem", fontWeight: "700", color: "var(--ink)" }}>
                A dataset of legal contracts with rich expert annotations
              </h2>
              <div className="divider" />

              <p style={{ color: "var(--text-muted)", lineHeight: "1.9", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
                Contract Understanding Atticus Dataset (CUAD) v1 is a corpus of 13,000+ labels in 510 commercial legal contracts that have been manually labeled under the supervision of experienced lawyers to identify 41 types of legal clauses that are considered important in contract review in connection with a corporate transaction, including mergers &amp; acquisitions, etc.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.9", fontSize: "0.95rem", marginBottom: "2rem" }}>
                CUAD is curated and maintained by The Atticus Project, Inc. to support NLP research and development in legal contract review.
              </p>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/datasets" className="btn btn-dark">Explore All Datasets →</Link>
                <Link href="/research" className="btn btn-outline-dark">View All Research</Link>
              </div>
            </div>

            {/* Right — sidebar cards */}
            <div id="dataset">
              {/* Dataset card */}
              <div style={{
                background: "var(--off-white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "1.75rem",
                marginBottom: "1.25rem",
              }}>
                <p style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  Dataset
                </p>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
                  <p style={{ fontWeight: "700", marginBottom: "0.5rem", fontSize: "0.95rem", color: "var(--ink)" }}>CUAD v1</p>
                  <a href="https://github.com/TheAtticusProject/cuad" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "var(--purple)", textDecoration: "none", display: "block", marginBottom: "0.3rem" }}>
                    README / Datasheet →
                  </a>
                  <a href="https://github.com/TheAtticusProject/cuad/releases" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "var(--purple)", textDecoration: "none" }}>
                    Download here →
                  </a>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>License: <strong>CC BY 4.0</strong></p>
              </div>

              {/* Publication card */}
              <div id="publication" style={{
                background: "var(--off-white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "1.75rem",
              }}>
                <p style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  Publication
                </p>
                <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: "1.8", marginBottom: "1rem" }}>
                  Accepted by <strong>NeurIPS 2021</strong> — the 35th Conference on Neural Information Processing Systems (Datasets and Benchmarks Track).
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <a href="https://arxiv.org/abs/2103.06268" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "var(--purple)", textDecoration: "none", fontWeight: "600" }}>
                    Read the paper on arXiv →
                  </a>
                  <a href="https://github.com/TheAtticusProject/cuad" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "var(--purple)", textDecoration: "none" }}>
                    View code &amp; model on GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contributors ─────────────────────────────────────── */}
      <section id="contributors" className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <h2 style={{ marginBottom: "0.25rem", fontSize: "1.75rem", fontWeight: "700", color: "var(--ink)" }}>Contributors</h2>
          <div className="divider" style={{ marginBottom: "2.5rem" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {contributors.map(group => (
              <div key={group.title} style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
              }}>
                <p style={{ fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)", marginBottom: "1rem" }}>
                  {group.title}
                </p>
                {group.names.map(n => (
                  <p key={n} style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>{n}</p>
                ))}
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            The use of CUAD, Atticus Labels and other information provided by The Atticus Project is subject to our{" "}
            <Link href="/privacy-policy" style={{ color: "var(--purple)", textDecoration: "none" }}>privacy policy</Link> and{" "}
            <Link href="/disclaimer" style={{ color: "var(--purple)", textDecoration: "none" }}>disclaimer</Link>.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .section .container > div[style*="grid"] { grid-template-columns: 1fr !important; }
          h1 { font-size: 1.75rem !important; }
        }
      `}</style>
    </>
  );
}
