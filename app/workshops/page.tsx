"use client";
// ─── Corporate Workshops Interest Form ───────────────────────────────────────
// Standalone inquiry page for corporate workshops.
//
// FORM SUBMISSION:
//   Uses Formspree to send form data directly from the website (no email client).
//   To set up:
//     1. Go to https://formspree.io and create a free account
//     2. Create a new form and copy the form ID (looks like "xabcdefg")
//     3. Replace "YOUR_FORMSPREE_ID" below with that ID
//
// QUICK EDITS:
//   - Formspree ID: search "YOUR_FORMSPREE_ID" below
//   - Workshop topics list: update the bullet array in the left column
// ─────────────────────────────────────────────────────────────────────────────

const FORMSPREE_ID = "mkovdgwv";

import { useState } from "react";

export default function WorkshopsPage() {
  const [form, setForm] = useState({
    name: "", title: "", org: "", email: "",
    employees: "", format: "", topics: "", message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          title: form.title,
          organization: form.org,
          email: form.email,
          team_size: form.employees,
          format: form.format,
          topics: form.topics,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 100%)",
        padding: "5rem 0 4rem",
        color: "white",
      }}>
        <div className="container">
          <span className="label-tag label-tag-white">For Legal Teams</span>
          <h1 style={{ color: "white", marginTop: "0.25rem", maxWidth: "620px" }}>
            Request a Corporate Workshop
          </h1>
          <div className="divider divider-white" style={{ marginTop: "1.25rem" }} />
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: "1.8", marginTop: "1rem", fontSize: "1rem" }}>
            Tell us about your team and we'll design a session that fits your organization's size, practice areas, and AI maturity level.
          </p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section className="section bg-alt">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>

            {/* Left — What to Expect */}
            <div>
              <span className="label-tag">What We Cover</span>
              <h2 style={{ marginTop: "0.25rem", marginBottom: "1rem", fontSize: "1.6rem" }}>
                Tailored to your team
              </h2>
              <div className="divider" />
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Led by practicing attorneys and AI researchers, every workshop is customized around your organization's goals. Sessions are available in-person or online, and can be half-day, full-day, or a multi-session series.
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
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--slate-dark)", marginTop: "0.55rem", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.9rem", color: "var(--text-body)", margin: 0, lineHeight: "1.6" }}>{item}</p>
                  </div>
                ))}
              </div>

              <a
                href="/workshop-flyer.pdf"
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  color: "var(--purple)",
                  textDecoration: "none",
                }}
              >
                ↓ Download Workshop Overview (PDF)
              </a>
            </div>

            {/* Right — Interest Form */}
            <div>
              <div className="card" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
                <h3 style={{ marginBottom: "0.4rem" }}>Workshop Inquiry Form</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                  Submit your details and we'll reach out to design a program around your team's needs.
                </p>

                {status === "sent" ? (
                  <div className="form-success">
                    ✓ Your inquiry has been sent! We'll be in touch shortly to discuss your workshop.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field">
                      <label className="form-label">Your Name *</label>
                      <input className="form-input" type="text" required placeholder="Jane Smith"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-field">
                        <label className="form-label">Title / Role</label>
                        <input className="form-input" type="text" placeholder="General Counsel"
                          value={form.title}
                          onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Organization *</label>
                        <input className="form-input" type="text" required placeholder="Acme Corp"
                          value={form.org}
                          onChange={e => setForm(p => ({ ...p, org: e.target.value }))} />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label">Work Email *</label>
                      <input className="form-input" type="email" required placeholder="jane@example.com"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-field">
                        <label className="form-label">Approx. Team Size</label>
                        <input className="form-input" type="text" placeholder="e.g. 20–50"
                          value={form.employees}
                          onChange={e => setForm(p => ({ ...p, employees: e.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Format Preference</label>
                        <select
                          className="form-input"
                          value={form.format}
                          onChange={e => setForm(p => ({ ...p, format: e.target.value }))}
                          style={{ cursor: "pointer" }}
                        >
                          <option value="">Select one</option>
                          <option value="In-person">In-person</option>
                          <option value="Online">Online / Virtual</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="No preference">No preference</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label">Topics of Interest</label>
                      <input className="form-input" type="text" placeholder="e.g. AI risk, deep research, evaluating tools"
                        value={form.topics}
                        onChange={e => setForm(p => ({ ...p, topics: e.target.value }))} />
                    </div>

                    <div className="form-field">
                      <label className="form-label">Anything else?</label>
                      <textarea
                        className="form-input form-textarea"
                        placeholder="Tell us about your team, timeline, or specific goals…"
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      />
                    </div>

                    {status === "error" && (
                      <p style={{ fontSize: "0.82rem", color: "#b91c1c", marginBottom: "0.75rem" }}>
                        Something went wrong. Please try again or email us directly at{" "}
                        <a href="mailto:info@atticusprojectai.org" style={{ color: "var(--purple)" }}>info@atticusprojectai.org</a>
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-dark"
                      style={{ width: "100%", justifyContent: "center", marginTop: "0.25rem" }}
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "Sending…" : "Submit Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="1fr 1.4fr"] {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </>
  );
}
