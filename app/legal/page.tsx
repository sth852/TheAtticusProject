// ─── Legal / Licenses Page ────────────────────────────────────────────────────
// Lists the open-source licenses for each Atticus dataset and course.
//
// QUICK EDITS:
//   - Add a new dataset/license: add an object to the array inside the .map() below
//     Format: { label: "Dataset Name", license: "License Name", href: "license-url" }
//   - Update an existing license: find the matching label in the array and change `license` or `href`
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Licenses | The Atticus Project",
};

import Link from "next/link";

export default function LegalPage() {
  return (
    <section style={{ backgroundColor: "var(--ice-blue)", padding: "3rem 0" }}>
      <div className="legal-page">
        <h1>Legal Agreements</h1>
        
        <div style={{ marginTop: "2rem" }}>
          {[
            { label: "CUAD", license: "CC BY 4.0", href: "https://creativecommons.org/licenses/by/4.0/" },
            { label: "CUAD Labeling Handbook", license: "CC0 1.0", href: "https://creativecommons.org/publicdomain/zero/1.0/" },
            { label: "MAUD", license: "CC BY 4.0", href: "https://creativecommons.org/licenses/by/4.0/" },
            { label: "Commercial Contract Fundamentals Course", license: "Berkeley Executive Ed", href: "#" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", fontWeight: "600", color: "var(--heading-dark)" }}>{item.label}</span>
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "var(--purple)", textDecoration: "none" }}>{item.license}</a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", display: "flex", gap: "2rem" }}>
          <Link href="/privacy-policy" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--purple)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/disclaimer" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--purple)", textDecoration: "none" }}>Disclaimer</Link>
        </div>
      </div>
    </section>
  );
}
