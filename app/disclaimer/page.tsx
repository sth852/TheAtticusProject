// ─── Disclaimer Page ──────────────────────────────────────────────────────────
// Legal disclaimer — clarifies that Atticus datasets and content are not legal advice.
//
// QUICK EDITS:
//   - Disclaimer text: edit the three <p> blocks directly
//   - Privacy policy link: update the <Link href="/privacy-policy"> if the URL changes
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | The Atticus Project",
};

import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <section style={{ backgroundColor: "var(--ice-blue)", padding: "3rem 0" }}>
      <div className="legal-page">
        <h1>Disclaimer</h1>
        
        <p>Contract Understanding Atticus Dataset (CUAD), Atticus Labels, Atticus Labeling Handbooks and any information provided on this website do not, and are not intended to, constitute legal advice; instead, all information, content, and materials available on this website or by The Atticus Project are for general informational purposes only. Information on this website or provided by The Atticus Project may not constitute the most up-to-date or accurate legal or other information. The Atticus Project is not under any obligation to update or supplement CUAD, Atticus Labels, Atticus Labeling Handbooks, the content on this website.</p>
        
        <p>By using this website, submitting or completing a form or accessing or downloading CUAD, Atticus Labels or other information on this site or provided by The Atticus Project, you acknowledge and agree that we make no representation or warranty (expressed or implied) and, to the fullest extent permitted by applicable law, disclaim, and you agree to release and hold us and our agents harmless from, all claims, liabilities, losses and damages (whether direct, indirect, special, incidental, consequential, exemplary or any other theory of damages) in connection with or in any way related to your use of this website, any information on this website or provided to you by The Atticus Project. This website contains links to other third-party websites. Such links are only for the convenience of the reader, user or browser; The Atticus Project and its agents do not recommend or endorse the contents of the third-party sites.</p>
        
        <p>By using this website, submitting or completing a form or accessing or downloading a dataset or other information, you agree that The Atticus Project (and our agents) may process, store and share your personal data and your related rights. Please refer to our Privacy Policy at <Link href="/privacy-policy" style={{ color: "var(--purple)" }}>www.atticusprojectai.org/privacy-policy</Link>.</p>
      </div>
    </section>
  );
}
