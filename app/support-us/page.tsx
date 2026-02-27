// ─── Support Us Page ──────────────────────────────────────────────────────────
// Two support options: Donate and Purchase Handbook. Plus an impact stats section.
//
// QUICK EDITS:
//   - PayPal link: find "hosted_button_id=XXXXXXXXXX" and replace with real ID
//   - Handbook price: find "$39" and "$389" and update as needed
//   - Impact stats: find the stats array with "510+", "13,000+", "Free"
//   - Mailing address: find "60 Golden Aster Court" and update it
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Us | The Atticus Project",
};

export default function SupportUsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1a2a4a 100%)",
        padding: "5rem 0 4rem",
      }}>
        <div className="container">
          <div style={{ maxWidth: "640px" }}>
            <span className="label-tag label-tag-white">Support Us</span>
            <h1 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: "700",
              color: "white",
              lineHeight: 1.15,
              margin: "0.5rem 0 1.25rem",
            }}>
              Help Us Change the Legal Industry
            </h1>
            <div className="divider" />
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.75",
            }}>
              All of our work products are created by volunteers of The Atticus Project. Your support makes free, open-source legal AI research possible.
            </p>
          </div>
        </div>
      </section>

      {/* Support options */}
      <section className="section bg-white">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="label-tag">Two Ways to Give</span>
            <h2 style={{ marginTop: "0.25rem" }}>Support Our Work</h2>
            <div className="divider divider-center" />
            <p style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto", fontSize: "0.95rem", lineHeight: "1.75" }}>
              Whether through a direct donation or by purchasing our Labeling Handbook, every contribution advances open legal AI research.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: "900px", margin: "0 auto" }}>

            {/* Donate card */}
            <div className="card-accent" style={{ textAlign: "center", padding: "2.5rem" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--slate)" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: "0.75rem" }}>Make a Donation</h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.75", marginBottom: "2rem" }}>
                Donate via PayPal, credit card, or check. Every dollar goes directly toward funding our research, datasets, and AI education programs.
              </p>
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
                style={{ marginBottom: "2rem" }}
              >
                Donate via PayPal
              </a>
              <div style={{
                background: "var(--off-white)",
                borderRadius: "var(--radius-sm)",
                padding: "1.25rem",
                marginTop: "0.5rem",
              }}>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.78rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  Check payable to:
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "var(--text-body)", lineHeight: "1.75" }}>
                  The Atticus Project<br />
                  60 Golden Aster Court<br />
                  Brisbane, CA 94005
                </p>
              </div>
            </div>

            {/* Purchase card */}
            <div className="card-accent" style={{ textAlign: "center", padding: "2.5rem" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--slate)" strokeWidth="1.8">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: "0.75rem" }}>Purchase the Handbook</h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.75", marginBottom: "2rem" }}>
                Get the full CUAD Labeling Handbook (Word + PDF) with direct links to example clauses. An invaluable reference for legal AI practitioners and attorneys.
              </p>
              <a
                href="mailto:info@atticusprojectai.org?subject=Handbook%20Purchase%20Inquiry"
                className="btn btn-dark"
                style={{ marginBottom: "2rem" }}
              >
                Inquire to Purchase
              </a>
              <div style={{
                background: "var(--off-white)",
                borderRadius: "var(--radius-sm)",
                padding: "1.25rem",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Personal</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.1rem", fontWeight: "700", color: "var(--ink)" }}>$39</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", color: "var(--text-muted)" }}>per user</p>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Institutional</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.1rem", fontWeight: "700", color: "var(--ink)" }}>$389</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", color: "var(--text-muted)" }}>unlimited users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact section */}
      <section style={{ background: "var(--ink)", padding: "5rem 0", textAlign: "center" }}>
        <div className="container">
          <span className="label-tag label-tag-white">Impact</span>
          <h2 style={{ color: "white", marginTop: "0.25rem", marginBottom: "1rem" }}>Your Support at Work</h2>
          <div className="divider divider-center divider-white" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", maxWidth: "700px", margin: "2.5rem auto 0" }}>
            {[
              { num: "510+", label: "Contracts Annotated" },
              { num: "13,000+", label: "Expert Labels Created" },
              { num: "Free", label: "Open-Source Access" },
            ].map(s => (
              <div key={s.label}>
                <div className="stat-num" style={{ color: "var(--slate)" }}>{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .support-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
