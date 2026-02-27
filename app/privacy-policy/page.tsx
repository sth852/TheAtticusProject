// ─── Privacy Policy Page ──────────────────────────────────────────────────────
// Legal privacy policy for The Atticus Project — effective March 1, 2021.
//
// QUICK EDITS:
//   - Effective date: find "Effective from March 1, 2021" and update
//   - Contact email: find "info@atticusprojectai.org" and update both places
//   - Policy content: edit the <p> and <h2> blocks directly
// ──────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Atticus Project",
};

export default function PrivacyPolicyPage() {
  return (
    <section style={{ backgroundColor: "var(--ice-blue)", padding: "3rem 0" }}>
      <div className="legal-page">
        <h1>THE ATTICUS PROJECT PRIVACY POLICY</h1>
        <p style={{ fontWeight: "600", color: "var(--heading-dark)" }}>Effective from March 1, 2021</p>
        
        <p>The Atticus Project understands the importance of data privacy and respects the concerns of our users. We believe every user has the right to know and comprehend how your personal data is being collected. Thus, in the interest of transparency, we provide this notice explaining our online information practices and the choices you can make about the way your information is collected when you visit https://www.atticusprojectai.org, our pages on LinkedIn, github, Kaggle or other websites where Atticus dataset, Atticus labels or other information provided by The Atticus Project reside, or when you submit your personal information to The Atticus Project.</p>

        <h2>Information We Collect</h2>
        <p>In the course of using the Website, we will collect your name and email addresses if you register for our &quot;Atticus and Beyond&quot; monthly speaker series or if you register for our online forum. If you access or download the Atticus dataset (including but not limited to CUAD, formerly known as AOK), we will collect your name, company, position, email addresses and intended use of the dataset. We may use your email address as a mechanism for notifying you about future events, dataset updates and for other communications, however, this is solely at your discretion and you may opt-out of any further communications by contacting info@atticusprojectai.org.</p>
        <p>In addition, we also collect certain information about your visit to our website, such as the IP address of the computer being used; web pages requested; referring web page; browser used; date and time, that is used to improve our website and better understand which users are visiting our website.</p>

        <h2>How We Use It</h2>
        <p>The Atticus Project does not sell names or other personal information to third parties.</p>
        <p>With this said, we reserve the right to use personal information to protect the security or integrity of our Website; to protect against a threat to personal safety or destruction of property; to protect against legal liability; or to cooperate with government officials or parties in litigation, or as otherwise required by law. We may also share personal information with our successors and assigns in accordance with law. Any such use will be consistent with this Privacy Policy.</p>

        <h2>Security and Retention</h2>
        <p>We store and protect our database by means of various technical and procedural measures, and we restrict access to your information by unauthorized persons. We take precautions to host and maintain a secure website and to safeguard data from unauthorized use. We undertake a range of security practices, including measures to help restrict web access to or inappropriate use of sensitive data. We keep your personal information for as long as needed to fulfill the particular purpose for which it was collected.</p>

        <h2>Anti-Spam Policy and Your Opt-Out Rights</h2>
        <p>We are committed to permission-based communication and preventing the spread of spam or other forms of unsolicited emails. If you have received an email in error, you may remove your information from our database by requesting to unsubscribe at info@atticusprojectai.org.</p>

        <h2>International Transfer of Personal Information</h2>
        <p>Your personal information may be stored in data centers located within or outside the U.S. Users outside of the United States may have their personal information transferred to the United States. By providing us with your information you acknowledge that your data will be transferred to the U.S. and processed on servers in the U.S. However, all reasonable steps will be taken to protect your privacy in accordance with the applicable data protection laws.</p>

        <h2>Your Consent and Questions</h2>
        <p>By submitting personal information through this Website, you give your consent to our collection, use, and disclosure of such information as described in this Privacy Policy. If you have any questions about our Privacy Policy or requests about the status and correctness of data you have provided to us, please email info@atticusprojectai.org.</p>

        <h2>Links to Other Websites</h2>
        <p>The Website may provide links to other websites. We are not responsible for the privacy or security practices of other websites (including security, collection of personal information, or use of cookies) or practices of other organizations and individuals. We recommend you review their policy statements thoroughly.</p>

        <h2>Changes to the Privacy Policy</h2>
        <p>We review our privacy practices from time to time, and these practices are subject to review and change. Any change will be effective immediately upon posting on our Website and by changing the effective date below. We encourage our users to return to this policy periodically to get acquainted with any updates.</p>
      </div>
    </section>
  );
}
