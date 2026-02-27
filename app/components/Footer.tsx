// ─── Footer Component ─────────────────────────────────────────────────────────
// Appears at the bottom of every page on the site.
//
// LAYOUT: Four-column grid — Brand + socials | Research links | Education links | Org links
//
// HOW TO EDIT:
//   - Social links: edit the `socials` array at the top (href + SVG icon)
//   - Footer nav columns: find "Research", "Education", "Organization" sections below
//   - Copyright year: find "© 2025" and update it
//   - Email address: find "info@atticusprojectai.org" — update both display text and href
//
// RESPONSIVE: Collapses to 2 columns at 768px, 1 column at 480px (see <style> at bottom)
// ──────────────────────────────────────────────────────────────────────────────
"use client";
import Link from "next/link";
import Image from "next/image";

const socials = [
  { href: "https://github.com/TheAtticusProject", label: "GitHub", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { href: "https://weichen221.substack.com/", label: "Substack", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg> },
  { href: "https://x.com/TheAtticusAI", label: "X / Twitter", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { href: "https://www.linkedin.com/company/the-atticus-project", label: "LinkedIn", svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { href: "https://www.youtube.com/@theatticusproject7041", label: "YouTube", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { href: "mailto:info@atticusprojectai.org", label: "Email", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "white" }}>
      {/* Main grid */}
      <div className="container" style={{ padding: "3.5rem 1.5rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem", marginBottom: "2.5rem" }}>
          
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem", textDecoration: "none" }}>
              <Image src="/AtticusLogo.avif" alt="Atticus" width={38} height={38} style={{ objectFit: "contain" }} />
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: "700", color: "white" }}>
                The <span style={{ color: "var(--slate)" }}>Atticus</span> Project
              </span>
            </Link>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", maxWidth: "240px" }}>
              Non-profit advancing AI performance, education, and opportunity in the legal space.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              {socials.map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  title={s.label}
                  style={{ color: "rgba(255,255,255,0.45)", transition: "color 200ms ease" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--slate)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{s.svg}</a>
              ))}
            </div>
          </div>

          {/* Research */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: "0.9rem" }}>Research</p>
            {[
              { href: "/research", label: "Overview" },
              { href: "/cuad", label: "CUAD" },
              { href: "/maud", label: "MAUD" },
              { href: "/acord", label: "ACORD" },
              { href: "/labeling-handbook", label: "Labeling Handbook" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.45rem", transition: "color 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >{l.label}</Link>
            ))}
          </div>

          {/* Education */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: "0.9rem" }}>Education</p>
            {[
              { href: "/education", label: "Overview" },
              { href: "/education#blog", label: "FairlyAI Blog" },
              { href: "/education#courses", label: "MCLE Courses" },
              { href: "/bytesized-ai", label: "Bytesized AI" },
              { href: "/education#workshops", label: "Corporate Workshops" },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.45rem", transition: "color 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >{l.label}</Link>
            ))}
          </div>

          {/* Organization */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: "0.9rem" }}>Organization</p>
            {[
              { href: "/contact", label: "Contact Us" },
              { href: "/support-us", label: "Support Our Work" },
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/disclaimer", label: "Disclaimer" },
              { href: "/legal", label: "Licenses" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.45rem", transition: "color 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>© 2025 The Atticus Project, Inc. All rights reserved.</p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            <a href="mailto:info@atticusprojectai.org" style={{ color: "rgba(255,255,255,0.35)", transition: "color 200ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--slate)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >info@atticusprojectai.org</a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
