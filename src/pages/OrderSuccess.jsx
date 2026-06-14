import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrder } from "../lib/orders";

export default function OrderSuccess() {
  const { id } = useParams();
  const order = getOrder(id);

  return (
    <>
      <Navbar />
      <section style={styles.page}>
        <motion.div
          style={styles.card}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div style={styles.check}>✓</div>
          <h1 style={styles.h1}>Order confirmed!</h1>
          <p style={styles.sub}>Thank you — we're already getting it ready. ✨</p>

          <div style={styles.idBox}>
            <span style={styles.idLabel}>Order ID</span>
            <span style={styles.id}>{id}</span>
          </div>

          {order ? (
            <>
              <div style={styles.items}>
                {order.items.map((i, k) => (
                  <div key={k} style={styles.line}>
                    {i.front ? (
                      <img src={i.front} alt="" style={styles.thumb} />
                    ) : (
                      <div style={styles.thumb} />
                    )}
                    <span style={{ flex: 1 }}>{i.title} × {i.qty}</span>
                    <b>₹{i.price * i.qty}</b>
                  </div>
                ))}
              </div>
              <div style={styles.totalRow}>
                <span>Total ({order.payment.method})</span>
                <b>₹{order.total}</b>
              </div>
              <p style={styles.ship}>
                Shipping to {order.address.name}, {order.address.city} {order.address.pincode}
              </p>
            </>
          ) : (
            <p style={styles.sub}>Your order is placed. Details aren't on this device.</p>
          )}

          <div style={styles.btns}>
            <Link to="/catalog" style={styles.primary}>Continue shopping</Link>
            <Link to="/dashboard" style={styles.ghost}>View my orders</Link>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#FAF7F1", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 20px 80px" },
  card: { width: "100%", maxWidth: "560px", background: "#fff", border: "1px solid #EDE7DA", borderRadius: "24px", padding: "44px 38px", boxShadow: "0 30px 70px rgba(0,0,0,.1)", textAlign: "center", color: "#221F1A" },
  check: { width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#3A3D85,#2C2E6B)", color: "#fff", fontSize: "32px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" },
  h1: { fontSize: "34px", margin: 0 },
  sub: { color: "#7C766B", marginTop: "8px" },
  idBox: { display: "flex", flexDirection: "column", gap: "2px", background: "#FAF7F1", borderRadius: "12px", padding: "14px", margin: "22px 0" },
  idLabel: { fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#7C766B" },
  id: { fontSize: "20px", fontWeight: 700, color: "#2C2E6B" },
  items: { textAlign: "left", borderTop: "1px solid #EDE7DA", paddingTop: "10px" },
  line: { display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", fontSize: "14px" },
  thumb: { width: "40px", height: "40px", objectFit: "cover", borderRadius: "8px", background: "#F2EDE3" },
  totalRow: { display: "flex", justifyContent: "space-between", paddingTop: "12px", marginTop: "8px", borderTop: "1px solid #EDE7DA", fontSize: "18px" },
  ship: { color: "#7C766B", fontSize: "13px", marginTop: "12px" },
  btns: { display: "flex", gap: "12px", justifyContent: "center", marginTop: "26px", flexWrap: "wrap" },
  primary: { padding: "13px 26px", borderRadius: "999px", background: "#2C2E6B", color: "#fff", fontWeight: 700, textDecoration: "none" },
  ghost: { padding: "13px 26px", borderRadius: "999px", border: "1px solid #E2DBCD", color: "#221F1A", textDecoration: "none" },
};
