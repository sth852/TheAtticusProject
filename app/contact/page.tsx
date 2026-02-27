"use client";
// ─── Contact Page ─────────────────────────────────────────────────────────────
// Three sections: contact info cards, then a collaboration CTA banner.
//
// QUICK EDITS:
//   - Mailing address: find "60 Golden Aster Court" and update it
//   - Email address: find "info@atticusprojectai.org" — update both the display
//     text AND the mailto: href to keep them in sync
//   - Social links: find the array with GitHub/LinkedIn/X/YouTube hrefs
//   - CTA body text: edit the <p> in the bottom dark section
// ──────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1a2a4a 100%)",
        padding: "5rem 0 4rem",
      }}>
        <div className="container">
          <div style={{ maxWidth: "600px" }}>
            <span className="label-tag label-tag-white">Contact</span>
            <h1 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: "700",
              color: "white",
              lineHeight: 1.15,
              margin: "0.5rem 0 1.25rem",
            }}>
              Get in Touch
            </h1>
            <div className="divider" />
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.75",
            }}>
              Whether you're interested in collaborating, contributing, or learning more about our work — we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section bg-white">
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}>
            {/* Mailing Address */}
            <div className="card-accent" style={{ textAlign: "center" }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--slate)" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: "1rem" }}>Mailing Address</h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
                The Atticus Project<br />
                60 Golden Aster Court<br />
                Brisbane, CA 94005
              </p>
            </div>

            {/* Email */}
            <div className="card-accent" style={{ textAlign: "center" }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--slate)" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: "1rem" }}>Email</h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                For general inquiries, research collaboration, or media requests.
              </p>
              <a
                href="mailto:info@atticusprojectai.org"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  color: "var(--slate-dark)",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                }}
              >
                info@atticusprojectai.org →
              </a>
            </div>

            {/* Connect */}
            <div className="card-accent" style={{ textAlign: "center" }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "var(--ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--slate)" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 style={{ marginBottom: "1rem" }}>Follow Along</h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.92rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                Stay up to date on research, publications, and AI education.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { href: "https://github.com/TheAtticusProject", label: "GitHub", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                  { href: "https://www.linkedin.com/company/the-atticus-project", label: "LinkedIn", svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { href: "https://x.com/TheAtticusAI", label: "X", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { href: "https://www.youtube.com/@theatticusproject7041", label: "YouTube", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{ color: "var(--ink-mid)", transition: "color 200ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--slate-dark)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-mid)")}
                  >{s.svg}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick message CTA */}
      <section style={{ background: "var(--ink)", padding: "5rem 0", textAlign: "center" }}>
        <div className="container">
          <span className="label-tag label-tag-white">Collaborate</span>
          <h2 style={{ color: "white", marginTop: "0.25rem", marginBottom: "1rem" }}>Interested in Working Together?</h2>
          <div className="divider divider-center divider-white" />
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "520px", margin: "0 auto 2.25rem", lineHeight: "1.75", fontSize: "0.95rem" }}>
            We're always looking for attorneys, data scientists, and legal AI researchers to contribute to our work. Reach out to discuss research collaborations, dataset contributions, or speaking engagements.
          </p>
          <a href="mailto:info@atticusprojectai.org" className="btn btn-white">
            Send us an Email
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
