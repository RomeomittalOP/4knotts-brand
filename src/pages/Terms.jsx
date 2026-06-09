import { useEffect, useState } from "react";

function Terms() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < terms.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 400); // speed control

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Terms of Service</h1>

      <p style={styles.subtitle}>
        Clauses for Noted By 4 Knotts Agreement
      </p>

      <div style={styles.container}>
        {terms.slice(0, visibleCount).map((term, index) => (
          <div key={index} style={styles.card} className="fadeIn">
            <h3 style={styles.heading}>
              {index + 1}. {term.title}
            </h3>

            <TypewriterText text={term.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[i]);
      i++;

      if (i >= text.length) clearInterval(interval);
    }, 10); // typing speed

    return () => clearInterval(interval);
  }, [text]);

  return <p style={styles.text}>{displayText}</p>;
}

const terms = [
  {
    title: "Property Rights",
    content:
      "The rights of the design will remain with Noted By 4 Knotts even after acquisition of the designs by the client company."
  },
  {
    title: "Termination of Project",
    content:
      "If the project is terminated midway, the client will be responsible to pay 25–30% of the remaining work plus charges for completed work."
  },
  {
    title: "Usage Rights",
    content:
      "The client cannot modify designs without approval. Ownership remains with Noted By 4 Knotts. Any modification requires a new project."
  },
  {
    title: "Product Usage Scope",
    content:
      "Designs can only be used for notebooks/registers. Other uses require license renewal."
  },
  {
    title: "Royalty",
    content:
      "Noted By 4 Knotts is entitled to 15% of gross revenue from design sales. Payments will be made quarterly."
  },
  {
    title: "Quality Control",
    content:
      "Products must match specifications. Deviations beyond 2% may be rejected."
  },
  {
    title: "Exclusivity",
    content:
      "Client cannot produce similar-looking stationery for 12 months after agreement."
  },
  {
    title: "Timely Delivery",
    content:
      "Orders must be fulfilled within agreed time. Delay penalty: 2% per week."
  },
  {
    title: "Confidentiality",
    content:
      "Design themes, pricing, and vendor details are confidential."
  },
  {
    title: "Print Management",
    content:
      "Noted By 4 Knotts is not responsible for printing errors after final approval."
  },
  {
    title: "Client Responsibilities",
    content:
      "Client must provide timely feedback. No communication for 20 days may close the project."
  },
  {
    title: "Indemnification",
    content:
      "Client protects Noted By 4 Knotts from legal claims related to design usage."
  },
  {
    title: "Limited Liability",
    content:
      "Total liability will not exceed amount paid by the client."
  },
  {
    title: "Non-Disparagement",
    content:
      "Both parties agree not to make negative statements about each other."
  }
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#02040b,#07162f,#02040b)",
    color: "white",
    padding: "100px 20px",
    textAlign: "center"
  },

  title: {
    fontSize: "60px",
    marginBottom: "10px",
    color: "#d4af37"
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "40px",
    color: "#aaa"
  },

  container: {
    maxWidth: "1000px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  card: {
    background: "rgba(255,255,255,0.03)",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    textAlign: "left",
    backdropFilter: "blur(10px)"
  },

  heading: {
    color: "#d4af37",
    marginBottom: "10px",
    fontSize: "20px"
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#ddd"
  }
};

export default Terms;