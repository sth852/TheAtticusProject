// ─── Labeling Handbook Page ───────────────────────────────────────────────────
// The CUAD annotation guidelines used by attorneys to label the dataset.
//
// LAYOUT: Two-column — sticky sidebar (table of contents) + scrollable main content
//
// HOW TO EDIT:
//   - Sidebar sections/items: edit `sidebarSections` array below
//   - Handbook content: edit the content sections in the <main> area
//   - Sidebar anchor links auto-generate from item names — spaces and slashes
//     become hyphens (e.g. "Governing Law" → #governing-law)
//
// NOTE: The full handbook is also available for purchase as a Word + PDF document.
//   Pricing is managed on the /support-us page.
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labeling Handbook | The Atticus Project",
};

import Link from "next/link";

const sidebarSections = [
  { title: "Introductory Notes", items: [] },
  { title: "General Labeling Rules", items: [] },
  { title: "General Information", items: ["Document Name", "Agreement Date", "Parties", "Governing Law"] },
  { title: "Term", items: ["Effective Date", "Expiration Date", "Renewal Term", "Notice Period to Terminate Renewal", "Termination for Convenience"] },
  { title: "Restrictive Covenants", items: ["Exclusivity", "No-Solicit of Customers", "Non-Compete", "Competitive Restriction Exception", "Covenant not to Sue", "Most Favored Nation/MFN", "Non-Disparagement", "No-Solicit of Employees"] },
  { title: "Intellectual Property (IP) Clauses", items: ["License Grant", "Irrevocable or Perpetual License", "Affiliate License-Licensor", "Source Code Escrow", "IP Ownership Assignment", "Joint IP Ownership"] },
  { title: "Other Legal Clauses", items: ["Anti-Assignment", "Non-Transferable License", "Change of Control (CIC/CoC)", "Audit Rights", "Insurance", "Liquidated Damages", "Post-Termination Services", "Revenue/Profit Sharing", "ROFR/ROFN/ROFO", "Third Party Beneficiary"] },
];

export default function LabelingHandbookPage() {
  return (
    <section style={{ backgroundColor: "var(--ice-blue)", padding: "0" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", padding: "2rem" }}>
        {/* Sidebar */}
        <div className="handbook-sidebar">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <div className="section-title">{section.title}</div>
              {section.items.map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/[\s\/()]+/g, "-")}`} style={{ paddingLeft: "0.75rem" }}>
                  &gt; {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ padding: "2rem 0" }}>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--heading-dark)", marginBottom: "0.25rem", textAlign: "center" }}>
            Contract Understanding Atticus Dataset (CUAD)
          </h1>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "var(--heading-dark)", marginBottom: "0.5rem", textAlign: "center" }}>
            (Commercial Contracts) Labeling Handbook
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "var(--text-muted)", textAlign: "center", marginBottom: "2rem" }}>
            as of September 9, 2021
          </p>

          <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "1rem" }}>
              Contract Understanding Atticus Dataset (CUAD)(Commercial Contracts) v1 contains 13,000+ labels in 510 commercial legal contracts with rich expert annotations. The dataset has been manually labeled under the supervision of experienced lawyers to identify 41 types of legal clauses in commercial contracts that are considered important in contract review in connection with a corporate transaction, including mergers &amp; acquisitions, corporate finance, investments, initial public offering, etc.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              This Handbook contains selected guidelines developed by The Atticus Project to guide our volunteer annotators in curating CUAD (Commercial Contracts). This Handbook contains our interpretation of selected <a href="#" style={{ color: "var(--purple)", textDecoration: "underline" }}>Atticus Labels</a> and contract clauses solely for the purpose of curating CUAD and does not constitute legal advice.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              This Handbook is subject to the disclaimers set forth at <Link href="/disclaimer" style={{ color: "var(--purple)", textDecoration: "underline" }}>https://www.atticusprojectai.org/disclaimer</Link>, and the processing, storage and sharing of your personal data and your related rights is subject to the privacy policy set forth at <Link href="/privacy-policy" style={{ color: "var(--purple)", textDecoration: "underline" }}>www.atticusprojectai.org/privacy-policy</Link>.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Access to <a href="/cuad" style={{ color: "var(--purple)", textDecoration: "underline" }}>CUAD</a>, <a href="#" style={{ color: "var(--purple)", textDecoration: "underline" }}>Atticus Labels</a>, and this <a href="#" style={{ color: "var(--purple)", textDecoration: "underline" }}>Handbook</a> on our website is free. We encourage you to share your suggestions and ideas to this Handbook by emailing <a href="mailto:info@atticusprojectai.org" style={{ color: "var(--purple)" }}>info@atticusprojectai.org</a>.
            </p>
            <p style={{ marginBottom: "2rem" }}>
              This Handbook and our other work products are created by volunteers of The Atticus Project. Support our continuing efforts to provide you with high-quality free content by purchasing a downloadable version of the full Handbook.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link href="/support-us" className="btn-slate">
                Purchase Handbook Download
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container { grid-template-columns: 1fr !important; }
          .handbook-sidebar { position: static !important; max-height: none !important; }
        }
      `}</style>
    </section>
  );
}
