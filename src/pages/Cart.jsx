import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { auth } from "../firebase"; // 🔥 ADD
import { API_BASE } from "../api";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  } = useContext(CartContext);

  const [showPayment, setShowPayment] = useState(false);
  const [method, setMethod] = useState("UPI");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 🔥 FINAL ORDER FUNCTION (UPDATED)
  const handleOrder = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first ❌");
        return;
      }

      const res = await fetch(`${API_BASE}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.displayName || "User",
          email: user.email,
          items: cart,
          total: total
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully 🎉");
        window.location.href = "/";
      } else {
        alert(data.error || "Something went wrong ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <h1 style={styles.heading}>🛒 Your Bag</h1>

        {cart.length === 0 ? (
          <p style={styles.empty}>It's empty in here, bestie 😭 go add some drip.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={styles.card}>
                <img src={item.front} style={styles.image} />

                <div style={{ flex: 1 }}>
                  <h3>{item.title}</h3>
                  <p>₹{item.price}</p>

                  <div style={styles.qtyBox}>
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeBtn}
                >
                  ❌
                </button>
              </div>
            ))}

            <h2 style={styles.total}>Total: ₹{total}</h2>

            <button
              style={styles.orderBtn}
              onClick={() => navigate("/checkout")}
            >
              Checkout →
            </button>
          </>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Select Payment Method</h2>

            <div style={styles.methods}>
              <button
                style={method === "UPI" ? styles.active : styles.methodBtn}
                onClick={() => setMethod("UPI")}
              >
                UPI
              </button>

              <button
                style={method === "CARD" ? styles.active : styles.methodBtn}
                onClick={() => setMethod("CARD")}
              >
                Card
              </button>
            </div>

            {method === "UPI" && (
              <div style={styles.section}>
                <p>Scan & Pay</p>
                <img src="/upi-qr.png" style={styles.qr} />
              </div>
            )}

            {method === "CARD" && (
              <div style={styles.section}>
                <input placeholder="Card Number" style={styles.input} />
                <input placeholder="Card Holder Name" style={styles.input} />

                <div style={styles.row}>
                  <input placeholder="MM/YY" style={styles.input} />
                  <input placeholder="CVV" style={styles.input} />
                </div>
              </div>
            )}

            <button style={styles.payBtn} onClick={handleOrder}>
              Place Order (Demo)
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  page: {
    padding: "120px 40px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#FAF7F1,#F2EDE3,#FAF7F1)",
    color: "#221F1A"
  },

  heading: {
    fontSize: "40px",
    marginBottom: "30px"
  },

  empty: {
    fontSize: "20px",
    opacity: 0.7
  },

  card: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    background: "#fff",
    border: "1px solid #EDE7DA",
    boxShadow: "0 10px 30px rgba(0,0,0,.04)",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "20px"
  },

  image: {
    width: "90px",
    borderRadius: "10px"
  },

  qtyBox: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  removeBtn: {
    background: "transparent",
    border: "none",
    color: "#86868b",
    fontSize: "18px",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  total: {
    marginTop: "30px",
    fontSize: "26px",
    color: "#2C2E6B"
  },

  orderBtn: {
    marginTop: "20px",
    padding: "14px",
    width: "100%",
    background: "#2C2E6B",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    color: "#221F1A",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 30px 70px rgba(0,0,0,.2)"
  },

  methods: {
    display: "flex",
    gap: "10px",
    margin: "15px 0"
  },

  methodBtn: {
    flex: 1,
    padding: "10px",
    background: "#F2EDE3",
    border: "none",
    color: "#221F1A",
    borderRadius: "8px"
  },

  active: {
    flex: 1,
    padding: "10px",
    background: "#2C2E6B",
    border: "none",
    color: "#fff",
    borderRadius: "8px"
  },

  section: {
    marginTop: "10px"
  },

  qr: {
    width: "200px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#F2EDE3",
    color: "#221F1A"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  payBtn: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    background: "linear-gradient(135deg,#5B60C0,#2C2E6B,#21224F)",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    borderRadius: "8px",
    cursor: "pointer"
  }
};