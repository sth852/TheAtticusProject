export default function ContactPage() {
  return (
    <>
      <section
        style={{
          backgroundColor: "var(--navy)",
          padding: "5rem 0 4rem",
          color: "white",
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Reach Out
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: "700",
            }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      <section className="section-cream" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
              maxWidth: "900px",
            }}
          >
            {/* Info */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.5rem",
                  color: "var(--navy)",
                  marginBottom: "0.5rem",
                }}
              >
                Get In Touch
              </h2>
              <div className="gold-rule" />
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                }}
              >
                We welcome collaboration from attorneys, researchers, and
                technologists interested in advancing legal AI. Reach out to
                learn more about our work or how to get involved.
              </p>
              <a
                href="mailto:info@atticusprojectai.org"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "var(--navy)",
                  textDecoration: "none",
                  borderBottom: "2px solid var(--gold)",
                  paddingBottom: "2px",
                }}
              >
                info@atticusprojectai.org
              </a>

              <div style={{ marginTop: "2rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Follow Us
                </p>
                {[
                  { href: "https://www.linkedin.com/company/the-atticus-project", label: "LinkedIn" },
                  { href: "https://x.com/TheAtticusAI", label: "X / Twitter" },
                  { href: "https://github.com/TheAtticusProject", label: "GitHub" },
                  { href: "https://www.youtube.com/@theatticusproject7041", label: "YouTube" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9rem",
                      color: "var(--navy)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--navy)")}
                  >
                    → {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card">
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.2rem",
                  color: "var(--navy)",
                  marginBottom: "1.5rem",
                }}
              >
                Send a Message
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Name", type: "text", placeholder: "Your name" },
                  { label: "Email", type: "email", placeholder: "your@email.com" },
                  { label: "Organization", type: "text", placeholder: "Law firm, company, etc." },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "var(--navy)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%",
                        padding: "0.7rem 1rem",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.9rem",
                        border: "1px solid rgba(10,22,40,0.2)",
                        outline: "none",
                        backgroundColor: "var(--cream)",
                        color: "var(--navy)",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--navy)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help?"
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "0.7rem 1rem",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9rem",
                      border: "1px solid rgba(10,22,40,0.2)",
                      outline: "none",
                      backgroundColor: "var(--cream)",
                      color: "var(--navy)",
                      resize: "vertical",
                    }}
                  />
                </div>
                <button className="btn-gold" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
