// ─── Navbar Component ──────────────────────────────────────────────────────────
// Sticky top navigation bar that appears on every page.
//
// HOW TO EDIT:
//   - Add a new top-level link: add it to the desktop nav <div> and the mobile menu array
//   - Add a new dropdown item: find the matching dropdown-menu <div> and add a <Link>
//   - Change the "Support Us" button color: update `background: "var(--slate)"` below
//   - Change the logo size: update width/height on the <Image> component
//   - Change the nav background: update the `background` in the <nav> style
//
// BREAKPOINT: Nav collapses to hamburger at 840px wide (see <style> at bottom)
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  // Controls whether the mobile hamburger menu is open or closed
  const [mobileOpen, setMobileOpen] = useState(false);

  // Gets the current page URL path so we can highlight the active nav link
  const pathname = usePathname();

  // Returns true if the given href matches the current page
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav style={{
      // ── Nav background: change these colors to restyle the nav bar ──
      background: "linear-gradient(90deg, var(--ink) 0%, #162135 100%)",
      borderBottom: "1px solid rgba(156,185,200,0.12)",
      position: "sticky",
      top: 0,
      zIndex: 1000, // Keep nav above all other content
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "68px", // ← Change this to make the nav taller or shorter
      }}>

        {/* ── Logo + Site Name ───────────────────────────────────────────── */}
        {/* Clicking the logo always goes back to the homepage */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flexShrink: 0 }}>
          {/* Logo image — stored in /public/AtticusLogo.png */}
          <Image
            src="/AtticusLogo.png"
            alt="The Atticus Project"
            width={44}
            height={44}
            style={{ objectFit: "contain" }}
          />
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.05rem",
            fontWeight: "700",
            color: "white",
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}>
            {/* "Atticus" is highlighted in slate blue — change the color in var(--slate) */}
            The <span style={{ color: "var(--slate)" }}>Atticus</span> Project
          </span>
        </Link>

        {/* ── Desktop Navigation Links ───────────────────────────────────── */}
        {/* Hidden on mobile (see @media CSS below) */}
        <div className="desktop-nav" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.15rem",
        }}>

          {/* Home link */}
          <Link href="/" className={`nav-link${isActive("/") ? " active" : ""}`}>Home</Link>

          {/* Research dropdown — shows when hovering the "Research" label */}
          <div className="dropdown">
            <Link
              href="/research"
              className={`nav-link${isActive("/research") || isActive("/cuad") || isActive("/maud") || isActive("/acord") || isActive("/datasets") ? " active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              Research
              {/* Chevron arrow icon */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            {/* Dropdown items — add more <Link> tags here to add new items */}
            <div className="dropdown-menu">
              <Link href="/research">Overview</Link>
              <Link href="/datasets">🔍 Explore Datasets</Link>
              <Link href="/cuad">CUAD</Link>
              <Link href="/maud">MAUD</Link>
              <Link href="/acord">ACORD</Link>
              <Link href="/labeling-handbook">Labeling Handbook</Link>
            </div>
          </div>

          {/* Education dropdown */}
          <div className="dropdown">
            <Link
              href="/education"
              className={`nav-link${isActive("/education") ? " active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              Education
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <div className="dropdown-menu">
              <Link href="/education">Overview</Link>
              <Link href="/education#blog">FairlyAI Blog</Link>
              <Link href="/education#courses">MCLE Courses</Link>
              <Link href="/education#workshops">Corporate Workshops</Link>
            </div>
          </div>

          {/* Contact link */}
          <Link href="/contact" className={`nav-link${isActive("/contact") ? " active" : ""}`}>Contact</Link>

          {/* Visual divider between regular links and the CTA button */}
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.12)", margin: "0 0.4rem" }} />

          {/* ── "Support Us" CTA Button ─────────────────────────────────── */}
          {/* Change `background: "var(--slate)"` to change the button color */}
          <Link href="/support-us" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.8rem",
            fontWeight: "700",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink)",
            background: "var(--slate)",
            padding: "0.45rem 1.1rem",
            borderRadius: "4px",
            transition: "background 220ms ease, transform 220ms ease",
            textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--slate-dark)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--slate)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Support Us
          </Link>
        </div>

        {/* ── Mobile Hamburger Button ────────────────────────────────────── */}
        {/* Only visible below 840px — controlled by @media CSS below */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          style={{ display: "none", background: "none", border: "none", color: "white", fontSize: "1.4rem", cursor: "pointer", padding: "0.25rem" }}
          aria-label="Toggle menu"
        >
          {/* Switches between X (close) and hamburger (open) icons */}
          {mobileOpen
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          }
        </button>
      </div>

      {/* ── Mobile Menu (fullscreen dropdown) ──────────────────────────────── */}
      {/* Only shown when hamburger is clicked — mirrors the desktop links */}
      {mobileOpen && (
        <div style={{
          background: "var(--ink-mid)",
          borderTop: "1px solid rgba(156,185,200,0.12)",
          padding: "0.75rem 1.5rem 1.25rem",
        }}>
          {/* Mobile nav items — add new pages here to include them in mobile menu
              `sub: true` indents the item and dims it to show it's a sub-item */}
          {[
            { href: "/",                label: "Home" },
            { href: "/research",        label: "Research" },
            { href: "/datasets",        label: "Explore Datasets", sub: true },
            { href: "/cuad",            label: "CUAD",             sub: true },
            { href: "/maud",            label: "MAUD",             sub: true },
            { href: "/acord",           label: "ACORD",            sub: true },
            { href: "/labeling-handbook", label: "Labeling Handbook", sub: true },
            { href: "/education",       label: "Education" },
            { href: "/education#workshops", label: "Corporate Workshops", sub: true },
            { href: "/contact",         label: "Contact" },
            { href: "/support-us",      label: "Support Us" },
          ].map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)} // Close menu when a link is tapped
              style={{
                display: "block",
                padding: "0.55rem 0",
                paddingLeft: (item as {sub?: boolean}).sub ? "1rem" : "0",
                color: (item as {sub?: boolean}).sub ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: (item as {sub?: boolean}).sub ? "0.85rem" : "0.95rem",
                fontWeight: (item as {sub?: boolean}).sub ? "400" : "500",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {(item as {sub?: boolean}).sub ? `– ${item.label}` : item.label}
            </Link>
          ))}
        </div>
      )}

      {/* ── Responsive CSS ──────────────────────────────────────────────────── */}
      {/* Change 840px to adjust when the nav collapses to hamburger */}
      <style>{`
        @media (max-width: 840px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; }
        }
      `}</style>
    </nav>
  );
}
