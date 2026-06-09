import { motion } from "framer-motion";

function ProductShowcase() {
  const products = [
    {
      title: "Premium Notebooks",
      desc: "Spiral notebooks that make your notes look elite.",
      emoji: "📒"
    },
    {
      title: "Executive Diaries",
      desc: "For the boardroom main characters and meeting royalty.",
      emoji: "📘"
    },
    {
      title: "Office Essentials",
      desc: "Pens, folders & desk drip that actually slaps.",
      emoji: "🖊️"
    },
    {
      title: "Custom Branding",
      desc: "Your logo, your vibe — printed to perfection.",
      emoji: "🎁"
    }
  ];

  return (
    <section style={styles.section}>
      <motion.p
        style={styles.tag}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        THE LINEUP
      </motion.p>

      <motion.h2
        style={styles.heading}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
      >
        Built Different, For Every Desk
      </motion.h2>

      <div style={styles.grid}>
        {products.map((item, index) => (
          <motion.div
            key={index}
            style={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
              y: -10,
              borderColor: "rgba(212,175,55,.45)",
              boxShadow: "0 20px 45px rgba(0,0,0,.45)"
            }}
          >
            <div style={styles.icon}>{item.emoji}</div>
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