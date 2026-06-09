import {
  FileText,
  Palette,
  Settings,
  Boxes,
  Leaf,
  Truck
} from "lucide-react";
import { motion } from "framer-motion";

function Legacy() {
  const cards = [
    {
      icon: <FileText size={22} />,
      title: "Buttery 100 GSM Paper",
      desc:
        "Zero bleed-through. Smooth pages your pen will be obsessed with."
    },
    {
      icon: <Palette size={22} />,
      title: "25+ Aesthetics",
      desc:
        "From clean marble vibes to bold loud designs — there's a whole mood."
    },
    {
      icon: <Settings size={22} />,
      title: "Custom Branding",
      desc:
        "Your logo, your story — printed clean for brands and big gifting energy."
    },
    {
      icon: <Boxes size={22} />,
      title: "Bulk Ready",
      desc:
        "Big orders for schools, stores, colleges and corporates — no stress."
    },
    {
      icon: <Leaf size={22} />,
      title: "Eco Conscious",
      desc:
        "Sustainable materials and recyclable packaging — guilt-free flexing."
    },
    {
      icon: <Truck size={22} />,
      title: "Pan-India Shipping",
      desc:
        "Fast, reliable delivery that pulls up anywhere in India."
    }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.top}>
        <p style={styles.mini}>WHY WE HIT DIFFERENT</p>

        <h2 style={styles.heading}>
          The <span style={styles.gold}>Noted</span> Difference
        </h2>
      </div>

      <div style={styles.grid}>
        {cards.map((item, index) => (
          <motion.div
            key={index}
            style={styles.card}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: (index % 3) * 0.12,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
              y: -8,
              borderColor: "rgba(212,175,55,.4)",
              boxShadow: "0 18px 40px rgba(0,0,0,.4)"
            }}
          >
            <div style={styles.iconWrap}>{item.icon}</div>

            <h3 style={styles.title}>{item.title}</h3>

            <p style={styles.desc}>{item.desc}</p>
          </motion.div>
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