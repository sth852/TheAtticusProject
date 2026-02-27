// ─── MAUD Dataset Page ────────────────────────────────────────────────────────
// Merger Agreement Understanding Dataset — 152 agreements, 47,000+ labels, 92 questions.
//
// QUICK EDITS:
//   - Stat pills: edit the `stats` array
//   - Description paragraphs: edit the body <p> blocks
//   - Dataset card links: search "TheAtticusProject/maud"
//   - Contributors: edit the `contributors` array
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAUD Dataset | The Atticus Project",
};

import Link from "next/link";

export default function MAUDPage() {
  const stats = ["152 merger agreements", "47,000+ labels", "92 questions", "CC BY 4.0"];

  const contributors = [
    {
      title: "Attorney Advisors",
      names: ["Wei Chen", "Ravi Mahesh", "Gordon Moodie", "Andy Nussbaum", "Mike O'Bryan", "Rita-Anne O'Neill", "Anne Beth Stebbins", "Patricia Vella", "Daisy Beckner", "Daniel Belke"],
    },
    {
      title: "Additional Volunteers",
      names: ["And many more dedicated volunteers who contributed to the annotation effort."],
      prose: true,
    },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1a2a4a 100%)", padding: "4rem 0" }}>
        <div className="container">
          <span className="label-tag label-tag-white" style={{ marginBottom: "1.5rem", display: "inline-block" }}>
            Dataset 02
          </span>

          <h1 style={{ color: "white", marginBottom: "1rem", fontSize: "2.75rem", fontWeight: "800", lineHeight: "1.2" }}>
            Merger Agreement Understanding<br />Dataset{" "}
            <span style={{ color: "var(--slate)" }}>(MAUD)</span>
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
              { href: "https://github.com/TheAtticusProject/maud", label: "Code ↗" },
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
                A dataset of merger agreements with rich expert annotations
              </h2>
              <div className="divider" />

              <p style={{ color: "var(--text-muted)", lineHeight: "1.9", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
                Merger Agreement Understanding Dataset (MAUD) v1 is a corpus of 47,000+ labels in 152 merger agreements that have been manually labeled under the supervision of experienced lawyers to identify 92 questions in each agreement used by the 2021 American Bar Association (ABA) Public Target Deal Points Study.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.9", fontSize: "0.95rem", marginBottom: "2rem" }}>
                MAUD is curated and maintained by The Atticus Project, Inc. to support NLP research and development in legal contract review.
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
                  <p style={{ fontWeight: "700", marginBottom: "0.5rem", fontSize: "0.95rem", color: "var(--ink)" }}>MAUD v1</p>
                  <a href="https://github.com/TheAtticusProject/maud" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "var(--purple)", textDecoration: "none", display: "block", marginBottom: "0.3rem" }}>
                    README / Datasheet →
                  </a>
                  <a href="https://github.com/TheAtticusProject/maud/releases" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "var(--purple)", textDecoration: "none" }}>
                    Download here →
                  </a>
                </div>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-body)", marginBottom: "0.4rem" }}>
                    <strong>Supplementary:</strong> MAUD-extraction v1
                  </p>
                  <a href="https://github.com/TheAtticusProject/maud" target="_blank" rel="noopener noreferrer"
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
                  Accepted at <strong>EMNLP 2023</strong> — the 2023 Conference on Empirical Methods in Natural Language Processing.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <a href="https://arxiv.org/abs/2301.00876" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", color: "var(--purple)", textDecoration: "none", fontWeight: "600" }}>
                    Read the paper on arXiv →
                  </a>
                  <a href="https://github.com/TheAtticusProject/maud" target="_blank" rel="noopener noreferrer"
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
                  <p key={n} style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.4rem", fontStyle: group.prose ? "italic" : "normal" }}>{n}</p>
                ))}
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            The use of MAUD, Atticus Labels and other information provided by The Atticus Project is subject to our{" "}
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
