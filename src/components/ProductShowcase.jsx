function ProductShowcase() {
  const products = [
    {
      title: "Premium Notebooks",
      desc: "Luxury spiral notebooks for students and professionals.",
      emoji: "📒"
    },
    {
      title: "Executive Diaries",
      desc: "Elegant diaries for offices, meetings and gifting.",
      emoji: "📘"
    },
    {
      title: "Office Essentials",
      desc: "Pens, folders, files and desk stationery supplies.",
      emoji: "🖊️"
    },
    {
      title: "Custom Branding",
      desc: "Personalized printing for schools and companies.",
      emoji: "🎁"
    }
  ];

  return (
    <section style={styles.section}>
      <p style={styles.tag}>OUR COLLECTION</p>

      <h2 style={styles.heading}>
        Crafted for Every Need
      </h2>

      <div style={styles.grid}>
        {products.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{item.emoji}</div>

            <h3 style={styles.title}>{item.title}</h3>

            <p style={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "90px 60px",
    background:
      "linear-gradient(180deg,#02060d,#07111f,#02060d)",
    color: "white",
    textAlign: "center"
  },

  tag: {
    color: "#6f8fff",
    fontSize: "12px",
    letterSpacing: "3px",
    marginBottom: "18px"
  },

  heading: {
    fontSize: "48px",
    marginBottom: "55px",
    fontFamily: "Cormorant Garamond"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "24px"
  },

  card: {
    background:
      "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,.06)",
    borderRadius: "18px",
    padding: "32px 24px",
    backdropFilter: "blur(12px)",
    transition: "0.3s ease",
    cursor: "pointer"
  },

  icon: {
    fontSize: "42px",
    marginBottom: "18px"
  },

  title: {
    fontSize: "22px",
    marginBottom: "14px"
  },

  desc: {
    color: "#b8b8b8",
    lineHeight: "1.7",
    fontSize: "15px"
  }
};

export default ProductShowcase;