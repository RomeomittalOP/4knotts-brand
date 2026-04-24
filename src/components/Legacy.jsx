import {
  FileText,
  Palette,
  Settings,
  Boxes,
  Leaf,
  Truck
} from "lucide-react";

function Legacy() {
  const cards = [
    {
      icon: <FileText size={22} />,
      title: "100 GSM Premium Paper",
      desc:
        "No bleed-through. Smooth pages engineered for superior everyday writing."
    },
    {
      icon: <Palette size={22} />,
      title: "25+ Exclusive Designs",
      desc:
        "From elegant marble themes to bold modern collections."
    },
    {
      icon: <Settings size={22} />,
      title: "Custom Branding",
      desc:
        "Logo printing, corporate gifting and institutional identity solutions."
    },
    {
      icon: <Boxes size={22} />,
      title: "Wholesale Ready",
      desc:
        "Bulk supply for schools, retailers, colleges and corporate clients."
    },
    {
      icon: <Leaf size={22} />,
      title: "Eco Conscious",
      desc:
        "Sustainable materials, recyclable packaging and responsible production."
    },
    {
      icon: <Truck size={22} />,
      title: "Pan India Shipping",
      desc:
        "Reliable dispatch network with fast delivery across India."
    }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.top}>
        <p style={styles.mini}>WHY CHOOSE US</p>

        <h2 style={styles.heading}>
          The <span style={styles.gold}>4 Knotts</span> Difference
        </h2>
      </div>

      <div style={styles.grid}>
        {cards.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.iconWrap}>{item.icon}</div>

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
    padding: "110px 60px",
    background:
      "radial-gradient(circle at top left, rgba(212,175,55,.06), transparent 28%), #02040b",
    color: "white"
  },

  top: {
    maxWidth: "900px",
    marginBottom: "50px"
  },

  mini: {
    color: "#d4af37",
    fontSize: "12px",
    letterSpacing: "4px",
    marginBottom: "18px"
  },

  heading: {
    fontSize: "clamp(42px,6vw,78px)",
    lineHeight: "1",
    fontWeight: "500",
    fontFamily: "Cormorant Garamond",
    margin: 0
  },

  gold: {
    color: "#d4af37"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "24px"
  },

  card: {
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(212,175,55,.12)",
    borderRadius: "22px",
    padding: "30px",
    minHeight: "260px",
    transition: "0.35s ease",
    cursor: "pointer"
  },

  iconWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(212,175,55,.08)",
    color: "#d4af37",
    marginBottom: "22px"
  },

  title: {
    fontSize: "28px",
    fontFamily: "Cormorant Garamond",
    marginBottom: "14px"
  },

  desc: {
    color: "#b8b8b8",
    lineHeight: "1.8",
    fontSize: "15px"
  }
};

export default Legacy;