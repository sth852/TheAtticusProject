import Link from "next/link";

export default function ResearchPage() {
  const datasets = [
    {
      name: "CUAD",
      full: "Contract Understanding Atticus Dataset",
      desc: "CUAD is an expert-annotated dataset that helps AI spot the most important parts of legal contracts. Built from 500+ contracts with 13,000+ labels across 41 clause types, it teaches models to highlight key terms, speeding up contract review and making it easier to catch red flags.",
      href: "/cuad",
    },
    {
      name: "MAUD",
      full: "Merger Agreement Understanding Dataset",
      desc: "MAUD is an expert-annotated dataset that helps AI understand merger agreements. Built from the ABA's Public Target Deal Points Study, it turns real &quot;deal points&quot; into clear questions and answers, giving legal-tech tools a reliable way to read and interpret key terms at scale.",
      href: "/maud",
    },
    {
      name: "ACORD",
      full: "Atticus Clause Retrieval Dataset",
      desc: "ACORD is the first expert-annotated dataset built to help AI find the right legal contract clauses. It includes real lawyer-written queries and thousands of rated clauses, making it easier to draft and review complex contracts like Limitation of Liability and Indemnification.",
      href: "/acord",
    },
  ];

  return (
    <>
      {/* Page Header */}
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
            Open Source · Expert Annotated
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: "700",
              maxWidth: "600px",
            }}
          >
            Our Research
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "620px",
              marginTop: "1rem",
              lineHeight: "1.7",
            }}
          >
            We create open-source datasets and benchmarks to advance research in
            legal AI. Working with expert lawyers, we design and label real-world
            legal tasks and publish papers that help the community build smarter,
            more reliable legal AI systems.
          </p>
        </div>
      </section>

      {/* Datasets */}
      <section className="section-cream" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {datasets.map((ds, i) => (
              <div
                key={ds.name}
                className="card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "2rem",
                  alignItems: "start",
                  borderLeft: "4px solid var(--gold)",
                  padding: "2.5rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "3rem",
                      fontWeight: "800",
                      color: "var(--navy)",
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {ds.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: "var(--gold)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Dataset {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.4rem",
                      color: "var(--navy)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {ds.full}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.95rem",
                      color: "var(--text-muted)",
                      lineHeight: "1.7",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {ds.desc}
                  </p>
                  <Link href={ds.href} className="btn-gold" style={{ fontSize: "0.8rem", padding: "0.6rem 1.5rem" }}>
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub CTA */}
      <section
        style={{
          backgroundColor: "var(--navy)",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.8rem",
              color: "white",
              marginBottom: "0.75rem",
            }}
          >
            Access Our Datasets
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "1.5rem",
            }}
          >
            All datasets are freely available on GitHub.
          </p>
          <a
            href="https://github.com/TheAtticusProject"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            View on GitHub
          </a>
        </div>
      </section>
    </>
  );
}
