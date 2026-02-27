// ─── Dataset Explorer Page ─────────────────────────────────────────────────────
// A searchable, plain-English interface to The Atticus Project's datasets.
//
// HOW IT WORKS:
//   - `clauseData` below is the main data source — add/edit clauses here
//   - Each clause has: a plain-English name, explanation, technical name,
//     which dataset it belongs to, a category, and example text
//   - The search bar filters by any of these fields
//   - Category and dataset filter chips narrow results further
//
// TO ADD A NEW CLAUSE: copy any object in clauseData and update the fields.
// TO CHANGE A DESCRIPTION: edit the `explanation` field for that clause.
// ──────────────────────────────────────────────────────────────────────────────

"use client";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Dataset = "CUAD" | "MAUD" | "ACORD";
type Category =
  | "Contract Basics"
  | "Termination"
  | "Intellectual Property"
  | "Liability & Risk"
  | "Confidentiality"
  | "Payments & Term"
  | "Assignment & Control"
  | "Governance"
  | "M&A Specific"
  | "Clause Retrieval";

interface Clause {
  plain: string;        // Non-technical name shown to general users
  technical: string;   // Exact clause-type name used in the dataset
  dataset: Dataset;
  category: Category;
  explanation: string; // Plain-English explanation (1-2 sentences)
  example: string;     // Short excerpt showing what the clause looks like
  importance: "High" | "Medium";
}

// ── Clause Data ────────────────────────────────────────────────────────────────
// Edit this array to change what appears on the page.
// Datasets: "CUAD" = commercial contracts, "MAUD" = merger agreements, "ACORD" = clause retrieval
const clauseData: Clause[] = [
  // ── CUAD – Contract Basics ────────────────────────────────────────────────
  {
    plain: "Contract Title",
    technical: "Document Name",
    dataset: "CUAD",
    category: "Contract Basics",
    explanation: "The official name or title of the contract document itself — used for identification and filing.",
    example: "Software License Agreement",
    importance: "Medium",
  },
  {
    plain: "Who's Signing This?",
    technical: "Parties",
    dataset: "CUAD",
    category: "Contract Basics",
    explanation: "The names and roles of each signing party — clearly identifies who the contract is between.",
    example: "This Agreement is entered into between Acme Corp ('Company') and Dev Studios Inc ('Contractor').",
    importance: "High",
  },
  {
    plain: "When Did They Sign?",
    technical: "Agreement Date",
    dataset: "CUAD",
    category: "Contract Basics",
    explanation: "The date the contract was signed or officially executed — important for legal validity and enforceability.",
    example: "This Agreement is dated as of January 15, 2024.",
    importance: "High",
  },
  {
    plain: "When Does It Start?",
    technical: "Effective Date",
    dataset: "CUAD",
    category: "Contract Basics",
    explanation: "The date when rights and obligations under the contract actually begin — may be different from the signature date.",
    example: "This Agreement shall be effective as of the date first written above.",
    importance: "High",
  },
  {
    plain: "When Does It End?",
    technical: "Expiration Date",
    dataset: "CUAD",
    category: "Contract Basics",
    explanation: "The date when the contract's initial term ends — after which it may expire, renew, or require renegotiation.",
    example: "Unless earlier terminated, this Agreement shall continue for a period of one (1) year from the Effective Date.",
    importance: "High",
  },

  // ── CUAD – Termination ────────────────────────────────────────────────────
  {
    plain: "Either Side Can End the Contract",
    technical: "Termination for Convenience",
    dataset: "CUAD",
    category: "Termination",
    explanation: "Lets one or both parties end the contract at any time, without needing a specific reason — usually with advance notice.",
    example: "Either party may terminate this Agreement upon thirty (30) days' written notice to the other party.",
    importance: "High",
  },
  {
    plain: "Auto-Renewal Clause",
    technical: "Renewal Term",
    dataset: "CUAD",
    category: "Payments & Term",
    explanation: "The contract automatically extends for another period unless someone takes action to cancel it before the deadline.",
    example: "This Agreement shall automatically renew for successive one-year terms unless either party provides sixty (60) days' written notice of non-renewal.",
    importance: "High",
  },
  {
    plain: "Notice Requirements",
    technical: "Notice Period to Terminate Renewal",
    dataset: "CUAD",
    category: "Termination",
    explanation: "Specifies how far in advance you must notify the other party if you don't want the contract to renew.",
    example: "Either party wishing to terminate must provide written notice at least ninety (90) days prior to the end of the then-current term.",
    importance: "Medium",
  },
  {
    plain: "Services Continue After Exit",
    technical: "Post-Termination Services",
    dataset: "CUAD",
    category: "Termination",
    explanation: "Any services or obligations that must continue even after the contract officially ends — such as returning property or transitional support.",
    example: "Following termination, Vendor shall provide transition services for thirty (30) days at no additional charge.",
    importance: "Medium",
  },

  // ── CUAD – Intellectual Property ──────────────────────────────────────────
  {
    plain: "Who Owns What You Build",
    technical: "IP Ownership Assignment",
    dataset: "CUAD",
    category: "Intellectual Property",
    explanation: "Determines who holds ownership rights over work, code, or content created during the contract — especially important for employees and contractors.",
    example: "All work product created by Contractor in connection with this Agreement shall be considered work-for-hire and owned exclusively by Company.",
    importance: "High",
  },
  {
    plain: "License to Use IP",
    technical: "License Grant",
    dataset: "CUAD",
    category: "Intellectual Property",
    explanation: "Grants one party permission to use the other's intellectual property (patents, software, trademarks) under specific conditions.",
    example: "Company hereby grants Licensee a non-exclusive, non-transferable license to use the Software solely for Licensee's internal business purposes.",
    importance: "High",
  },
  {
    plain: "Restrictions After Leaving",
    technical: "Non-Compete",
    dataset: "CUAD",
    category: "Intellectual Property",
    explanation: "Prevents a party from working for competitors or starting a competing business for a set period after the contract ends.",
    example: "For a period of two (2) years following termination, Employee shall not engage in any business activity that directly competes with Company.",
    importance: "High",
  },
  {
    plain: "Can't Solicit Our People",
    technical: "Non-Solicitation",
    dataset: "CUAD",
    category: "Intellectual Property",
    explanation: "Prohibits one party from poaching the other's employees or customers after the contract ends.",
    example: "During the term and for one (1) year thereafter, neither party shall solicit for employment any employee of the other party.",
    importance: "Medium",
  },
  {
    plain: "Shared Ownership of New IP",
    technical: "Joint IP Ownership",
    dataset: "CUAD",
    category: "Intellectual Property",
    explanation: "When both parties share ownership of intellectual property created during the contract — requires mutual agreement to commercialize.",
    example: "Any inventions created jointly by the parties shall be owned equally, and neither party may commercialize without the other's written consent.",
    importance: "Medium",
  },
  {
    plain: "License Can't Be Taken Back",
    technical: "Irrevocable or Perpetual License",
    dataset: "CUAD",
    category: "Intellectual Property",
    explanation: "A license that cannot be taken back or that lasts forever — a major risk flag in any contract as it severely limits licensor's control.",
    example: "Licensor grants Licensee an irrevocable, perpetual license to use the Technology in all fields of use worldwide.",
    importance: "High",
  },
  {
    plain: "Licensor's Affiliates Get Rights Too",
    technical: "Affiliate License Licensor",
    dataset: "CUAD",
    category: "Intellectual Property",
    explanation: "Whether the licensor extends their license rights to their own affiliates and subsidiaries automatically.",
    example: "The license extends to Licensor's wholly-owned subsidiaries and affiliates, provided they agree to be bound by this Agreement.",
    importance: "Medium",
  },

  // ── CUAD – Liability & Risk ────────────────────────────────────────────────
  {
    plain: "Cap on Damages You Owe",
    technical: "Cap on Liability",
    dataset: "CUAD",
    category: "Liability & Risk",
    explanation: "A maximum dollar amount one party can owe the other in damages — often capped at the contract value or annual fees.",
    example: "In no event shall either party's liability exceed the fees paid or payable under this Agreement in the twelve (12) months preceding the claim.",
    importance: "High",
  },
  {
    plain: "No Limit on Some Damages",
    technical: "Uncapped Liability",
    dataset: "CUAD",
    category: "Liability & Risk",
    explanation: "Whether there is NO cap on damages either party can owe — usually for specific categories like indemnification or IP infringement.",
    example: "Notwithstanding any limitation of liability, indemnification obligations shall be uncapped and not subject to the liability limitations above.",
    importance: "High",
  },
  {
    plain: "Who Covers Legal Costs",
    technical: "Indemnification",
    dataset: "CUAD",
    category: "Liability & Risk",
    explanation: "Requires one party to compensate the other for specific losses, legal fees, or damages — like a financial safety net.",
    example: "Company shall indemnify and hold harmless Vendor from any third-party claims arising from Company's breach of this Agreement.",
    importance: "High",
  },
  {
    plain: "Fixed Damages Amount",
    technical: "Liquidated Damages",
    dataset: "CUAD",
    category: "Liability & Risk",
    explanation: "Pre-agreed damage amounts the parties set in advance for specific breaches — avoids costly disputes over actual damages.",
    example: "If either party breaches a material term, the non-breaching party shall be entitled to liquidated damages of $50,000 per occurrence.",
    importance: "Medium",
  },
  {
    plain: "Unforeseeable Events Excuse",
    technical: "Force Majeure",
    dataset: "CUAD",
    category: "Liability & Risk",
    explanation: "Excuses a party from performing if an extraordinary event — like a natural disaster, war, or pandemic — makes it impossible.",
    example: "Neither party shall be liable for delays caused by circumstances beyond their reasonable control, including acts of God, war, or government action.",
    importance: "Medium",
  },
  {
    plain: "Required Insurance Coverage",
    technical: "Insurance",
    dataset: "CUAD",
    category: "Liability & Risk",
    explanation: "Specifies the types and minimum amounts of insurance each party must maintain throughout the contract.",
    example: "Vendor shall maintain commercial general liability insurance of not less than $2,000,000 per occurrence during the term of this Agreement.",
    importance: "Medium",
  },

  // ── CUAD – Confidentiality ────────────────────────────────────────────────
  {
    plain: "Keep This Secret",
    technical: "Confidentiality",
    dataset: "CUAD",
    category: "Confidentiality",
    explanation: "Requires both parties to protect sensitive information shared during the relationship and not disclose it to outside parties.",
    example: "Each party agrees to maintain in strict confidence all Confidential Information disclosed by the other party and not to disclose it to any third party.",
    importance: "High",
  },
  {
    plain: "Non-Disclosure Agreement",
    technical: "NDA / Non-Disclosure",
    dataset: "CUAD",
    category: "Confidentiality",
    explanation: "A formal agreement preventing one or both parties from sharing proprietary information with outsiders.",
    example: "Recipient shall not disclose any Confidential Information to third parties without prior written consent of the Disclosing Party.",
    importance: "High",
  },

  // ── CUAD – Payments & Term ────────────────────────────────────────────────
  {
    plain: "How Much and When to Pay",
    technical: "Revenue/Profit Sharing",
    dataset: "CUAD",
    category: "Payments & Term",
    explanation: "Outlines the financial terms — how much is owed, when payments are due, and how revenue or profits are divided.",
    example: "Company shall pay Vendor a monthly fee of $10,000, due on the first business day of each month during the term.",
    importance: "High",
  },
  {
    plain: "Price Increase Rights",
    technical: "Price Restrictions",
    dataset: "CUAD",
    category: "Payments & Term",
    explanation: "Limits or conditions under which a party can raise prices during the contract term.",
    example: "Vendor may adjust fees annually by no more than the prior year's Consumer Price Index percentage change upon sixty (60) days' notice.",
    importance: "Medium",
  },
  {
    plain: "Minimum Purchase Requirement",
    technical: "Minimum Commitment",
    dataset: "CUAD",
    category: "Payments & Term",
    explanation: "A minimum amount the buyer must purchase regardless of actual need — locks in revenue for the seller.",
    example: "Buyer commits to purchase a minimum of 1,000 units per month during the term, regardless of actual usage.",
    importance: "Medium",
  },
  {
    plain: "Maximum Purchase Limit",
    technical: "Volume Restriction",
    dataset: "CUAD",
    category: "Payments & Term",
    explanation: "Limits on how much product or service can be purchased or delivered — protects the supplier from over-commitment.",
    example: "Seller shall not be obligated to deliver more than 5,000 units per calendar month.",
    importance: "Medium",
  },
  {
    plain: "How Long Warranties Last",
    technical: "Warranty Duration",
    dataset: "CUAD",
    category: "Payments & Term",
    explanation: "How long product or service warranties last — defines the period during which the seller must fix problems.",
    example: "All hardware shall be warranted against defects in materials and workmanship for a period of twelve (12) months from delivery.",
    importance: "Medium",
  },

  // ── CUAD – Assignment & Control ───────────────────────────────────────────
  {
    plain: "Can the Contract Be Transferred?",
    technical: "Anti-Assignment",
    dataset: "CUAD",
    category: "Assignment & Control",
    explanation: "Prevents the contract from being transferred to another party without consent — protects relationship-specific rights.",
    example: "Neither party may assign this Agreement or any of its rights hereunder without the prior written consent of the other party.",
    importance: "High",
  },
  {
    plain: "What Happens If the Company Is Sold",
    technical: "Change of Control",
    dataset: "CUAD",
    category: "Assignment & Control",
    explanation: "Describes what happens to the contract if one party is acquired, merges with another company, or undergoes major ownership changes.",
    example: "Either party may terminate this Agreement upon thirty (30) days' notice following a Change of Control of the other party.",
    importance: "High",
  },
  {
    plain: "Rules About Subsidiaries",
    technical: "Affiliate License-Licensee",
    dataset: "CUAD",
    category: "Assignment & Control",
    explanation: "Specifies whether the contract's rights and obligations apply to parent companies, subsidiaries, or affiliated entities.",
    example: "The license granted herein extends to Licensee's wholly-owned subsidiaries, provided Licensee remains responsible for their compliance.",
    importance: "Medium",
  },
  {
    plain: "Exclusive Rights — No Competitors",
    technical: "Exclusivity",
    dataset: "CUAD",
    category: "Assignment & Control",
    explanation: "Whether one party is the exclusive provider or partner, preventing work with competitors in a defined market or field.",
    example: "Company grants Distributor exclusive rights to sell the Products in North America for the term of this Agreement.",
    importance: "High",
  },
  {
    plain: "Right to Match a Competing Offer",
    technical: "ROFR/ROFO/ROFN",
    dataset: "CUAD",
    category: "Assignment & Control",
    explanation: "Right of first refusal, right of first offer, or right of first negotiation — priority rights to buy, partner, or negotiate before others.",
    example: "If Company receives a third-party offer to purchase the assets, Company must first offer them to Buyer at the same terms.",
    importance: "Medium",
  },
  {
    plain: "Competitor Clause Exceptions",
    technical: "Competitive Restriction Exception",
    dataset: "CUAD",
    category: "Assignment & Control",
    explanation: "Carve-outs that allow certain competitive activities despite a non-compete clause — defines exactly what is permitted.",
    example: "Notwithstanding the non-compete, Employee may engage in consulting for non-competing businesses without Company approval.",
    importance: "Medium",
  },
  {
    plain: "Best Price Guarantee",
    technical: "Most Favored Nation",
    dataset: "CUAD",
    category: "Assignment & Control",
    explanation: "Guarantees the party gets the best pricing or terms offered to anyone else — prevents favorable deals with competitors.",
    example: "If Company offers similar services to any third party at lower prices, Customer shall automatically receive the lower price.",
    importance: "Medium",
  },

  // ── CUAD – Governance ─────────────────────────────────────────────────────
  {
    plain: "Which State's Laws Apply",
    technical: "Governing Law",
    dataset: "CUAD",
    category: "Governance",
    explanation: "Establishes which jurisdiction's laws govern the contract interpretation and any legal disputes.",
    example: "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflicts of law provisions.",
    importance: "High",
  },
  {
    plain: "Where Disputes Are Settled",
    technical: "Dispute Resolution",
    dataset: "CUAD",
    category: "Governance",
    explanation: "Establishes how disagreements will be resolved — through courts, arbitration, or mediation — and where proceedings take place.",
    example: "Any dispute shall be resolved by binding arbitration in San Francisco, CA, under the AAA Commercial Arbitration Rules.",
    importance: "High",
  },
  {
    plain: "Who Can Represent the Company",
    technical: "Signing Authority",
    dataset: "CUAD",
    category: "Governance",
    explanation: "Specifies which individuals or roles have legal authority to execute and bind the company to the contract.",
    example: "This Agreement may only be executed by a duly authorized officer of each party with signatory authority at the Vice President level or above.",
    importance: "Medium",
  },
  {
    plain: "Can't Sue — Waiver",
    technical: "Covenant Not to Sue",
    dataset: "CUAD",
    category: "Governance",
    explanation: "A promise not to bring legal action against the other party for specified issues — releases them from liability.",
    example: "Licensor covenants not to sue Licensee for any infringement claims arising from Licensee's use of the licensed technology.",
    importance: "Medium",
  },
  {
    plain: "Third-Party Audit Rights",
    technical: "Audit Rights",
    dataset: "CUAD",
    category: "Governance",
    explanation: "Allows one party to inspect the other's records to verify compliance with contract terms like usage limits or royalty payments.",
    example: "Company shall have the right to audit Vendor's records relevant to this Agreement upon reasonable prior written notice, no more than once per year.",
    importance: "Medium",
  },
  {
    plain: "Outside Party Granted Rights",
    technical: "Third Party Beneficiary",
    dataset: "CUAD",
    category: "Governance",
    explanation: "Whether any outside party (not signing the contract) is granted rights under it — unusual but important when present.",
    example: "Customer's affiliates and permitted assigns shall have the right to use the Services as third-party beneficiaries.",
    importance: "Medium",
  },

  // ── MAUD – M&A Specific ───────────────────────────────────────────────────
  {
    plain: "What Counts as a Major Problem",
    technical: "Material Adverse Effect (MAE)",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Defines what constitutes a significant negative change in the target company that might let the buyer walk away from the deal.",
    example: "A Material Adverse Effect means any event that has had or would reasonably be expected to have a material adverse effect on the business, financial condition, or results of operations of the Company.",
    importance: "High",
  },
  {
    plain: "How Sure Is the Deal?",
    technical: "Reasonable Best Efforts / Deal Certainty",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Describes how hard each party must try to close the merger — a weaker standard like 'reasonable efforts' vs. a stronger 'best efforts'.",
    example: "Each party shall use its reasonable best efforts to take all actions necessary to consummate and make effective the Transactions.",
    importance: "High",
  },
  {
    plain: "Government Approval Required",
    technical: "Regulatory Approval Condition",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "The merger can only close after receiving approval from regulators like the FTC, DOJ, or foreign competition authorities.",
    example: "The obligations of the parties are conditioned upon the receipt of all required approvals under the Hart-Scott-Rodino Act.",
    importance: "High",
  },
  {
    plain: "Shareholder Vote Required",
    technical: "Stockholder Approval Condition",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "The deal requires approval from a majority of shareholders before it can be completed.",
    example: "The Merger is conditioned upon the approval and adoption of this Agreement by the holders of at least a majority of the outstanding Company Common Stock.",
    importance: "High",
  },
  {
    plain: "Breakup Fee",
    technical: "Termination Fee",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "A fee one party must pay to the other if the deal falls through — typically paid by the target if it accepts a better offer.",
    example: "If this Agreement is terminated pursuant to Section 8.3(b), the Company shall pay Parent a termination fee of $75,000,000.",
    importance: "High",
  },
  {
    plain: "Buyer Must Close or Pay",
    technical: "Reverse Termination Fee",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "What the buyer pays if they walk away from the deal — ensures the buyer is committed even if circumstances change.",
    example: "If Buyer fails to close due to a financing failure that is not a MAC, Buyer shall pay Seller a reverse termination fee of $50,000,000.",
    importance: "High",
  },
  {
    plain: "Can the Target Accept a Better Deal?",
    technical: "No-Shop / Fiduciary Out",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Restricts the target from soliciting competing bids, but may allow directors to consider an unsolicited superior offer to fulfill their fiduciary duties.",
    example: "The Company agrees not to solicit, initiate, or knowingly facilitate any Acquisition Proposal, subject to the Board's fiduciary obligations.",
    importance: "High",
  },
  {
    plain: "Promises About the Business",
    technical: "Representations and Warranties",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Statements of fact each party makes about itself — if they turn out to be false, the other party may have legal recourse.",
    example: "The Company represents and warrants that it has no undisclosed liabilities, has complied with all applicable laws, and all financial statements are accurate.",
    importance: "High",
  },
  {
    plain: "Reps Must Still Be True at Closing",
    technical: "Bring-Down Condition",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Requires representations and warranties made during negotiation to still be true at closing — protects buyer if business changes.",
    example: "Buyer's obligation to close is conditioned on Seller's representations and warranties being true in all material respects as of the Closing Date.",
    importance: "High",
  },
  {
    plain: "Deal Deadline",
    technical: "Outside Date / Drop-Dead Date",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "The deadline by which the deal must close or either party can walk — usually 9-12 months from signing.",
    example: "If the Closing has not occurred by June 30, 2025, either party may terminate this Agreement unless the failure is due to its own breach.",
    importance: "High",
  },
  {
    plain: "Buyer Can Match Competing Offer",
    technical: "Matching Rights",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Allows the buyer to match a competing offer to keep the deal alive — gives original buyer a second chance.",
    example: "If Seller receives a Superior Proposal, Seller must notify Buyer and allow Buyer 3 business days to match or exceed the competing offer.",
    importance: "High",
  },
  {
    plain: "Force the Other Side to Close",
    technical: "Specific Performance",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Can one party force the other to close even if they want to walk — ensures the deal actually happens.",
    example: "Buyer shall be entitled to seek specific performance to compel Seller to close the transaction.",
    importance: "High",
  },
  {
    plain: "Post-Closing Earnout Payments",
    technical: "Earnout",
    dataset: "MAUD",
    category: "M&A Specific",
    explanation: "Post-closing payments tied to the target company's future performance — aligns incentives and reduces buyer's upfront risk.",
    example: "Seller shall receive additional consideration of $10,000,000 if the Company achieves $50,000,000 in revenue within 12 months of closing.",
    importance: "Medium",
  },

  // ── ACORD – Clause Retrieval ───────────────────────────────────────────────
  {
    plain: "Find the Right Liability Clause",
    technical: "Limitation of Liability Retrieval",
    dataset: "ACORD",
    category: "Clause Retrieval",
    explanation: "ACORD helps AI systems find and rank the best Limitation of Liability clauses from a corpus of real contracts, based on expert-written queries.",
    example: "Query: 'Clause limiting total damages to the contract value' → Ranked results from 126,000+ rated clause pairs.",
    importance: "High",
  },
  {
    plain: "Find the Right Indemnification Clause",
    technical: "Indemnification Retrieval",
    dataset: "ACORD",
    category: "Clause Retrieval",
    explanation: "ACORD enables AI to retrieve and rank indemnification clauses most relevant to specific legal scenarios, as rated by expert attorneys.",
    example: "Query: 'One-sided indemnification covering third-party IP claims' → Ranked results across 114 expert query types.",
    importance: "High",
  },
  {
    plain: "Find Any Type of Clause by Description",
    technical: "General Clause Retrieval (114 Query Types)",
    dataset: "ACORD",
    category: "Clause Retrieval",
    explanation: "ACORD's 114 expert-written query types let AI systems retrieve the best matching clauses for virtually any contract drafting scenario.",
    example: "Queries range from short (5 words) to long (paragraph), in short/medium/long formats — covering termination, IP, payment, and more.",
    importance: "High",
  },
];

// ── Filter Options ──────────────────────────────────────────────────────────────
// Update these if you add new categories or datasets
const ALL_CATEGORIES: Category[] = [
  "Contract Basics",
  "Termination",
  "Intellectual Property",
  "Liability & Risk",
  "Confidentiality",
  "Payments & Term",
  "Assignment & Control",
  "Governance",
  "M&A Specific",
  "Clause Retrieval",
];

const ALL_DATASETS: Dataset[] = ["CUAD", "MAUD", "ACORD"];

// ── Dataset color map ──────────────────────────────────────────────────────────
// Change the colors here to restyle dataset badges
const DATASET_COLORS: Record<Dataset, { bg: string; text: string; border: string }> = {
  CUAD:  { bg: "rgba(89,51,170,0.12)",  text: "#5933aa", border: "rgba(89,51,170,0.25)"  },
  MAUD:  { bg: "rgba(15,52,96,0.12)",   text: "#0f3460", border: "rgba(15,52,96,0.25)"   },
  ACORD: { bg: "rgba(56,189,248,0.12)", text: "#0284c7", border: "rgba(56,189,248,0.3)"  },
};

const DATASET_DESCRIPTIONS: Record<Dataset, string> = {
  CUAD:  "Commercial contracts — 510 contracts, 41 clause types",
  MAUD:  "Merger agreements — 152 deals, 92 deal point questions",
  ACORD: "Clause retrieval — 126,000+ expert-rated query-clause pairs",
};

const DATASET_TARGETS: Record<Dataset, string> = {
  CUAD:  "Best for: AI researchers, legal tech companies, law students",
  MAUD:  "Best for: M&A attorneys, dealmakers, corporate lawyers",
  ACORD: "Best for: AI engineers building clause search tools",
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function DatasetsPage() {
  // Search and filter state
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [activeDataset, setActiveDataset] = useState<Dataset | "All">("All");

  // Pagination — show 9 results at a time, reset when filters change
  const [visibleCount, setVisibleCount] = useState(9);
  useEffect(() => { setVisibleCount(9); }, [query, activeCategory, activeDataset]);

  // Filtered results — recalculated whenever filters change
  const results = useMemo(() => {
    const q = query.toLowerCase();
    return clauseData.filter((c) => {
      const matchesQuery =
        !q ||
        c.plain.toLowerCase().includes(q) ||
        c.technical.toLowerCase().includes(q) ||
        c.explanation.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.example.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || c.category === activeCategory;
      const matchesDataset  = activeDataset  === "All" || c.dataset  === activeDataset;
      return matchesQuery && matchesCategory && matchesDataset;
    });
  }, [query, activeCategory, activeDataset]);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, var(--ink) 0%, #162038 55%, #1a2a4a 100%)",
        padding: "5rem 0 4rem",
      }}>
        <div className="container">
          <div style={{ maxWidth: "700px" }}>
            <span className="label-tag label-tag-white">Dataset Explorer</span>
            <h1 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: "700",
              color: "white",
              lineHeight: 1.15,
              margin: "0.5rem 0 1.25rem",
            }}>
              Explore Our Datasets
            </h1>
            <div className="divider" />
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.75",
              marginBottom: "2rem",
            }}>
              Search legal contract concepts in plain English — or by technical clause name.
              Whether you&apos;re an attorney, researcher, or just curious about AI and law.
            </p>

            {/* ── Search Bar ──────────────────────────────────────────────── */}
            <div style={{ position: "relative", maxWidth: "580px" }}>
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                style={{ position: "absolute", left: "1.1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              >
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search clauses — e.g. 'termination', 'who owns my work', 'breakup fee'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem 0.9rem 3rem",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.95rem",
                  color: "var(--ink)",
                  background: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: "var(--radius-sm)",
                  outline: "none",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              />
              {/* Clear button — only shows when there's a query */}
              {query && (
                <button
                  onClick={() => setQuery("")}
                  style={{
                    position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--gray-400)", fontSize: "1.1rem",
                  }}
                  aria-label="Clear search"
                >✕</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Dataset Summary Cards ──────────────────────────────────────────── */}
      <section style={{ background: "var(--ink-mid)", padding: "2rem 0", borderBottom: "1px solid rgba(156,185,200,0.1)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {ALL_DATASETS.map((ds) => {
              const col = DATASET_COLORS[ds];
              const isActive = activeDataset === ds;
              return (
                <button
                  key={ds}
                  onClick={() => setActiveDataset(isActive ? "All" : ds)}
                  style={{
                    textAlign: "left",
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-sm)",
                    border: `1.5px solid ${isActive ? "var(--slate)" : "rgba(156,185,200,0.15)"}`,
                    background: isActive ? "rgba(156,185,200,0.1)" : "transparent",
                    cursor: "pointer",
                    transition: "all 200ms ease",
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.3rem",
                    fontWeight: "800",
                    color: isActive ? "var(--slate)" : "rgba(255,255,255,0.6)",
                    marginBottom: "0.2rem",
                  }}>{ds}</div>
                  <div style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.73rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: "1.4",
                    marginBottom: "0.3rem",
                  }}>{DATASET_DESCRIPTIONS[ds]}</div>
                  <div style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: "1.3",
                  }}>{DATASET_TARGETS[ds]}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What is a Dataset? Explainer ──────────────────────────────────── */}
      <section style={{ background: "var(--off-white)", padding: "0 0 2rem" }}>
        <div className="container">
          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "2rem",
            marginBottom: "2rem",
          }}>
            <div>
              <div>
                <h2 style={{
                  fontSize: "1.35rem",
                  fontWeight: "700",
                  color: "var(--ink)",
                  marginBottom: "0.5rem",
                }}>
                  What Are These Datasets?
                </h2>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.9rem",
                  color: "var(--text-body)",
                  lineHeight: "1.7",
                  marginBottom: "1rem",
                }}>
                  The Atticus Project creates free, open-source datasets that teach AI systems to understand contracts. Each dataset contains real contracts and expert-labeled examples, allowing researchers and companies to build better legal AI tools. All datasets are released under <strong>CC BY 4.0</strong> — completely free to download, use, and share.
                </p>

                {/* Quick Guide */}
                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{
                    fontSize: "0.95rem",
                    fontWeight: "700",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}>
                    Which dataset is right for you?
                  </h3>
                  <ul style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}>
                    <li style={{
                      fontSize: "0.85rem",
                      color: "var(--text-body)",
                      lineHeight: "1.6",
                      marginBottom: "0.5rem",
                    }}>
                      <strong style={{ color: "#5933aa" }}>CUAD:</strong> Working with commercial contracts? CUAD teaches AI to identify 41 different clause types across purchase agreements, NDAs, employment contracts, and more.
                    </li>
                    <li style={{
                      fontSize: "0.85rem",
                      color: "var(--text-body)",
                      lineHeight: "1.6",
                      marginBottom: "0.5rem",
                    }}>
                      <strong style={{ color: "#0f3460" }}>MAUD:</strong> Focused on M&A? MAUD covers 92 deal points across 152 real merger agreements — helping AI understand acquisition documents.
                    </li>
                    <li style={{
                      fontSize: "0.85rem",
                      color: "var(--text-body)",
                      lineHeight: "1.6",
                    }}>
                      <strong style={{ color: "#0284c7" }}>ACORD:</strong> Building clause search or extraction tools? ACORD has 126,000+ expert-rated query-clause pairs for training semantic search models.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Results ─────────────────────────────────────────────── */}
      <section style={{ background: "var(--off-white)", padding: "3rem 0 5rem" }}>
        <div className="container">

          {/* ── Filter Row ────────────────────────────────────────────────── */}
          {/* Category filter chips — clicking a chip filters results to that category */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.72rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
            }}>Browse by Category</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {(["All", ...ALL_CATEGORIES] as (Category | "All")[]).map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "0.4rem 0.9rem",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.8rem",
                      fontWeight: isActive ? "700" : "500",
                      borderRadius: "999px",
                      border: `1.5px solid ${isActive ? "var(--ink)" : "var(--gray-200)"}`,
                      background: isActive ? "var(--ink)" : "white",
                      color: isActive ? "white" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 180ms ease",
                      whiteSpace: "nowrap",
                    }}
                  >{cat}</button>
                );
              })}
            </div>
          </div>

          {/* ── Results Header ────────────────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.88rem",
              color: "var(--text-muted)",
            }}>
              {results.length === clauseData.length
                ? `Showing all ${clauseData.length} clause types`
                : `${results.length} result${results.length !== 1 ? "s" : ""}${query ? ` for "${query}"` : ""}`}
            </p>
            {/* Active filter badges */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {activeDataset !== "All" && (
                <span style={{
                  padding: "0.25rem 0.65rem",
                  background: DATASET_COLORS[activeDataset].bg,
                  color: DATASET_COLORS[activeDataset].text,
                  border: `1px solid ${DATASET_COLORS[activeDataset].border}`,
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }} onClick={() => setActiveDataset("All")}>
                  {activeDataset} ✕
                </span>
              )}
              {activeCategory !== "All" && (
                <span style={{
                  padding: "0.25rem 0.65rem",
                  background: "rgba(156,185,200,0.15)",
                  color: "var(--slate-dark)",
                  border: "1px solid rgba(156,185,200,0.3)",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }} onClick={() => setActiveCategory("All")}>
                  {activeCategory} ✕
                </span>
              )}
            </div>
          </div>

          {/* ── Clause Cards ──────────────────────────────────────────────── */}
          {results.length === 0 ? (
            // Empty state — shown when no results match
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</p>
              <h3 style={{ marginBottom: "0.5rem" }}>No clauses found</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Try different keywords or clear your filters.
              </p>
              <button
                className="btn btn-outline-dark"
                onClick={() => { setQuery(""); setActiveCategory("All"); setActiveDataset("All"); }}
              >Clear All Filters</button>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.25rem" }}>
                {results.slice(0, visibleCount).map((clause) => {
                  const col = DATASET_COLORS[clause.dataset];
                  return (
                    <div
                      key={clause.technical}
                      style={{
                        background: "white",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border)",
                        padding: "1.5rem",
                        boxShadow: "var(--shadow-sm)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {/* Top row: dataset badge + importance */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{
                          padding: "0.2rem 0.6rem",
                          background: col.bg,
                          color: col.text,
                          border: `1px solid ${col.border}`,
                          borderRadius: "3px",
                          fontSize: "0.68rem",
                          fontWeight: "700",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}>{clause.dataset}</span>
                        {clause.importance === "High" && (
                          <span style={{
                            fontSize: "0.68rem",
                            fontWeight: "700",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "#b45309",
                            background: "#fef3c7",
                            border: "1px solid #fde68a",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "3px",
                          }}>High Priority</span>
                        )}
                      </div>

                      {/* Plain-English name */}
                      <h3 style={{ fontSize: "1.05rem", lineHeight: 1.3, color: "var(--ink)", marginBottom: "0" }}>
                        {clause.plain}
                      </h3>

                      {/* Technical name */}
                      <p style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.72rem",
                        fontWeight: "700",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}>
                        {clause.technical} · {clause.category}
                      </p>

                      {/* Plain-English explanation */}
                      <p style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.88rem",
                        color: "var(--text-body)",
                        lineHeight: "1.7",
                      }}>
                        {clause.explanation}
                      </p>

                      {/* Example clause text */}
                      <div style={{
                        background: "var(--off-white)",
                        borderLeft: "3px solid var(--slate)",
                        padding: "0.75rem 1rem",
                        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                      }}>
                        <p style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                          fontStyle: "italic",
                          lineHeight: "1.6",
                        }}>
                          &ldquo;{clause.example}&rdquo;
                        </p>
                      </div>

                      {/* Link to the dataset page */}
                      <Link
                        href={`/${clause.dataset.toLowerCase()}`}
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "0.78rem",
                          fontWeight: "700",
                          color: "var(--slate-dark)",
                          letterSpacing: "0.02em",
                          alignSelf: "flex-start",
                        }}
                      >
                        View {clause.dataset} Dataset →
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* ── Show More button ────────────────────────────────────────── */}
              {visibleCount < results.length && (
                <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                  <p style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "1rem",
                  }}>
                    Showing {Math.min(visibleCount, results.length)} of {results.length} results
                  </p>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setVisibleCount((c) => c + 9)}
                  >
                    Show More →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Download the Data ─────────────────────────────────────────────── */}
      <section style={{ background: "var(--off-white)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--ink)",
              marginBottom: "0.5rem",
            }}>
              Download the Data
            </h2>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              All datasets are free and open-source under CC BY 4.0. Download directly from GitHub or Hugging Face.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {/* CUAD GitHub */}
            <a
              href="https://github.com/TheAtticusProject/cuad"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
                textDecoration: "none",
                transition: "all 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#5933aa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{
                fontSize: "2rem",
                marginBottom: "1rem",
              }}>
                {/* GitHub Logo SVG */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#333" }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "var(--ink)",
                marginBottom: "0.5rem",
              }}>
                CUAD on GitHub
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.85rem",
                color: "var(--text-body)",
                lineHeight: "1.6",
              }}>
                Commercial contract dataset with 510 contracts and 41 clause types. Perfect for training models on general contract classification.
              </p>
            </a>

            {/* MAUD GitHub */}
            <a
              href="https://github.com/TheAtticusProject/maud"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
                textDecoration: "none",
                transition: "all 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#0f3460";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{
                fontSize: "2rem",
                marginBottom: "1rem",
              }}>
                {/* GitHub Logo SVG */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#333" }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "var(--ink)",
                marginBottom: "0.5rem",
              }}>
                MAUD on GitHub
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.85rem",
                color: "var(--text-body)",
                lineHeight: "1.6",
              }}>
                M&A deal dataset with 152 merger agreements and 92 deal point questions. Build your M&A legal tech with real acquisition documents.
              </p>
            </a>

            {/* ACORD GitHub */}
            <a
              href="https://github.com/TheAtticusProject/acord"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
                textDecoration: "none",
                transition: "all 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#0284c7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{
                fontSize: "2rem",
                marginBottom: "1rem",
              }}>
                {/* GitHub Logo SVG */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#333" }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "var(--ink)",
                marginBottom: "0.5rem",
              }}>
                ACORD on GitHub
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.85rem",
                color: "var(--text-body)",
                lineHeight: "1.6",
              }}>
                Clause retrieval dataset with 126,000+ expert-rated query-clause pairs. Train semantic search models to find the right clauses.
              </p>
            </a>

            {/* Hugging Face */}
            <a
              href="https://huggingface.co/TheAtticusProject"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
                textDecoration: "none",
                transition: "all 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#fbbf24";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{
                fontSize: "2rem",
                marginBottom: "1rem",
              }}>
                {/* Hugging Face Logo SVG */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#fbbf24" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "var(--ink)",
                marginBottom: "0.5rem",
              }}>
                The Atticus Project on Hugging Face
              </h3>
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.85rem",
                color: "var(--text-body)",
                lineHeight: "1.6",
              }}>
                All datasets in one place with model cards, usage examples, and integrations with the Hugging Face ecosystem.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ── For Researchers / Developers CTA ─────────────────────────────── */}
      <section style={{ background: "var(--ink)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left: non-technical */}
            <div>
              <span className="label-tag label-tag-white">For Attorneys</span>
              <h2 style={{ color: "white", marginTop: "0.25rem", marginBottom: "1rem", fontSize: "1.6rem" }}>
                Need help reviewing contracts?
              </h2>
              <div className="divider divider-white" />
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.75", fontSize: "0.95rem", marginBottom: "2rem" }}>
                Our datasets power AI tools that can automatically identify and flag important clauses in contracts. Reach out to learn how The Atticus Project&apos;s research can help your practice.
              </p>
              <Link href="/contact" className="btn btn-white">Contact Us</Link>
            </div>

            {/* Right: technical */}
            <div>
              <span className="label-tag label-tag-white">For Researchers</span>
              <h2 style={{ color: "white", marginTop: "0.25rem", marginBottom: "1rem", fontSize: "1.6rem" }}>
                Ready to build?
              </h2>
              <div className="divider divider-white" />
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.75", fontSize: "0.95rem", marginBottom: "2rem" }}>
                All three datasets are free and available on Hugging Face under CC BY 4.0. Download CUAD, MAUD, or ACORD today and start training your models on real, expert-labeled legal data.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href="https://huggingface.co/TheAtticusProject"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white"
                >
                  Hugging Face →
                </a>
                <Link href="/research" className="btn btn-outline-white">View Research</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .datasets-grid { grid-template-columns: 1fr !important; }
          .datasets-cta  { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </>
  );
}
