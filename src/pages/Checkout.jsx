import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { genOrderId, saveOrder } from "../lib/orders";
import { payWithRazorpay } from "../lib/razorpay";
import { API_BASE } from "../api";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [addr, setAddr] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    line: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  const set = (k) => (e) => setAddr({ ...addr, [k]: e.target.value });

  const validAddr =
    addr.name && addr.phone.length >= 10 && addr.line && addr.city && addr.pincode.length >= 5;

  const orderData = () => ({
    name: addr.name,
    email: addr.email,
    phone: addr.phone,
    address: addr,
    items: cart.map((i) => ({ title: i.title, qty: i.qty || 1, price: i.price, sub: i.sub, front: i.front })),
    subtotal,
    shipping,
    total,
  });

  const finish = (orderId, payment) => {
    saveOrder({ id: orderId, ...orderData(), payment, status: "Processing", createdAt: new Date().toISOString() });
    clearCart();
    setBusy(false);
    navigate(`/order-success/${orderId}`);
  };

  const placeOrder = async (method) => {
    setErr("");
    setBusy(true);

    if (method === "razorpay") {
      try {
        const orderId = await payWithRazorpay(orderData());
        finish(orderId, { method: "Razorpay", status: "Paid" });
      } catch (e) {
        setBusy(false);
        setErr(e.message || "Payment cancelled");
      }
      return;
    }

    // Cash / Pay on Delivery — save to backend, fall back to local if offline
    const payment = { method: "Pay on Delivery", status: "Pending" };
    try {
      const r = await fetch(`${API_BASE}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderData(), payment }),
      });
      const d = await r.json();
      finish(d.orderId || genOrderId(), payment);
    } catch {
      finish(genOrderId(), payment); // backend down → still place the order
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div style={styles.empty}>
          <h1 style={styles.h1}>Your bag is empty</h1>
          <p style={{ color: "#7C766B" }}>Add something you love, then check out.</p>
          <Link to="/catalog" style={styles.shopLink}>Browse the catalog →</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section style={styles.page}>
        <Link to="/cart" style={styles.back}>← Back to bag</Link>
        <h1 style={styles.h1}>Checkout</h1>

        <div style={styles.steps}>
          {["Shipping", "Review", "Payment"].map((s, idx) => (
            <span key={s} style={{ ...styles.stepChip, ...(step === idx + 1 ? styles.stepOn : {}) }}>
              {idx + 1}. {s}
            </span>
          ))}
        </div>

        <div style={styles.grid}>
          <div style={styles.main}>
            {step === 1 && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Shipping details</h3>
                <div style={styles.row}>
                  <input style={styles.input} placeholder="Full name *" value={addr.name} onChange={set("name")} />
                  <input style={styles.input} placeholder="Phone *" value={addr.phone} onChange={set("phone")} />
                </div>
                <input style={styles.input} placeholder="Email" value={addr.email} onChange={set("email")} />
                <input style={styles.input} placeholder="Address *" value={addr.line} onChange={set("line")} />
                <div style={styles.row}>
                  <input style={styles.input} placeholder="City *" value={addr.city} onChange={set("city")} />
                  <input style={styles.input} placeholder="State" value={addr.state} onChange={set("state")} />
                  <input style={styles.input} placeholder="Pincode *" value={addr.pincode} onChange={set("pincode")} />
                </div>
                <button
                  style={{ ...styles.primary, opacity: validAddr ? 1 : 0.5 }}
                  disabled={!validAddr}
                  onClick={() => setStep(2)}
                >
                  Continue to review →
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Review your order</h3>
                {cart.map((i) => (
                  <div key={i.id} style={styles.line}>
                    {i.front ? (
                      <img src={i.front} alt="" style={styles.thumb} />
                    ) : (
                      <div style={styles.thumb} />
                    )}
                    <span style={{ flex: 1 }}>{i.title} × {i.qty || 1}</span>
                    <b>₹{i.price * (i.qty || 1)}</b>
                  </div>
                ))}
                <div style={styles.addrBox}>
                  <b>{addr.name}</b> · {addr.phone}<br />
                  {addr.line}, {addr.city} {addr.state} {addr.pincode}
                </div>
                <div style={styles.row}>
                  <button style={styles.ghost} onClick={() => setStep(1)}>← Edit</button>
                  <button style={styles.primary} onClick={() => setStep(3)}>Continue to payment →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Payment</h3>
                <button
                  style={styles.payOption}
                  onClick={() => placeOrder("razorpay")}
                  disabled={busy}
                >
                  💳 Pay online — UPI, Cards, Netbanking (Razorpay)
                </button>
                <button style={styles.payOptionAlt} onClick={() => placeOrder("cod")} disabled={busy}>
                  📦 Pay on Delivery
                </button>
                {busy && <p style={{ color: "#7C766B", marginTop: 12 }}>Processing…</p>}
                {err && <p style={{ color: "#b23b4b", marginTop: 12 }}>{err}</p>}
              </div>
            )}
          </div>

          {/* SUMMARY */}
          <aside style={styles.summary}>
            <h3 style={styles.cardTitle}>Order summary</h3>
            <div style={styles.sumRow}><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div style={styles.sumRow}><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
            <div style={styles.sumRow}><span style={{ color: "#7C766B" }}>GST</span><span style={{ color: "#7C766B" }}>incl.</span></div>
            <div style={styles.sumTotal}><span>Total</span><span>₹{total}</span></div>
            {shipping > 0 && <p style={styles.freeHint}>Add ₹{499 - subtotal} more for free shipping</p>}
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}

const styles = {
  page: { padding: "120px 40px 80px", minHeight: "100vh", background: "#FAF7F1", color: "#221F1A" },
  back: { color: "#7C766B", textDecoration: "none", fontSize: "14px" },
  h1: { fontSize: "44px", margin: "12px 0 18px" },
  steps: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "26px" },
  stepChip: { padding: "8px 16px", borderRadius: "999px", background: "#F2EDE3", color: "#7C766B", fontSize: "13px", fontWeight: 600 },
  stepOn: { background: "#221F1A", color: "#fff" },
  grid: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "30px", alignItems: "start" },
  main: {},
  card: { background: "#fff", border: "1px solid #EDE7DA", borderRadius: "18px", padding: "26px", boxShadow: "0 10px 30px rgba(0,0,0,.04)" },
  cardTitle: { fontSize: "22px", marginBottom: "16px" },
  row: { display: "flex", gap: "12px", flexWrap: "wrap" },
  input: { flex: 1, minWidth: "140px", padding: "13px 15px", borderRadius: "10px", border: "1px solid #E2DBCD", background: "#FAF7F1", color: "#221F1A", fontSize: "15px", outline: "none", marginBottom: "12px" },
  primary: { marginTop: "8px", padding: "14px 26px", borderRadius: "999px", border: "none", background: "#2C2E6B", color: "#fff", fontWeight: 700, cursor: "pointer" },
  ghost: { marginTop: "8px", padding: "14px 22px", borderRadius: "999px", border: "1px solid #E2DBCD", background: "#fff", color: "#221F1A", cursor: "pointer" },
  line: { display: "flex", alignItems: "center", gap: "14px", padding: "10px 0", borderBottom: "1px solid #F2EDE3" },
  thumb: { width: "46px", height: "46px", objectFit: "cover", borderRadius: "8px", background: "#F2EDE3" },
  addrBox: { marginTop: "16px", padding: "14px", background: "#FAF7F1", borderRadius: "12px", fontSize: "14px", lineHeight: 1.6, color: "#4A463F" },
  payOption: { width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "#2C2E6B", color: "#fff", fontWeight: 700, fontSize: "15px", cursor: "pointer", marginBottom: "12px" },
  payDisabled: { opacity: 0.55 },
  payOptionAlt: { width: "100%", padding: "16px", borderRadius: "12px", border: "1.5px solid #2C2E6B", background: "#fff", color: "#2C2E6B", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
  summary: { background: "#fff", border: "1px solid #EDE7DA", borderRadius: "18px", padding: "26px", boxShadow: "0 10px 30px rgba(0,0,0,.04)", position: "sticky", top: "100px" },
  sumRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "15px" },
  sumTotal: { display: "flex", justifyContent: "space-between", paddingTop: "14px", marginTop: "8px", borderTop: "1px solid #EDE7DA", fontSize: "20px", fontWeight: 700 },
  freeHint: { marginTop: "10px", fontSize: "13px", color: "#2C2E6B" },
  empty: { minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", background: "#FAF7F1", textAlign: "center" },
  shopLink: { color: "#2C2E6B", fontWeight: 600, textDecoration: "none", marginTop: "10px" },
};
