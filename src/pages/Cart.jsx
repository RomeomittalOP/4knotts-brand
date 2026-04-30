import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import emailjs from "emailjs-com";

export default function Cart() {
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

  // 🔥 FINAL ORDER FUNCTION
  const handleOrder = async () => {
    try {
      const userEmail = "test@gmail.com"; // 🔁 baad me dynamic kar lena

      // ✅ SAVE TO MONGODB
      await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userEmail,
          items: cart,
          total: total
        })
      });

      // ✅ SEND EMAIL
      await emailjs.send(
        "YOUR_SERVICE_ID",   // 🔁 replace karna
        "YOUR_TEMPLATE_ID",  // 🔁 replace karna
        {
          user_email: userEmail,
          order_details: cart.map(i => i.title).join(", "),
          total: total
        },
        "YOUR_PUBLIC_KEY"    // 🔁 replace karna
      );

      alert("Order Confirmed ✅");

      clearCart();
      setShowPayment(false);

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <h1 style={styles.heading}>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p style={styles.empty}>Cart is empty 😢</p>
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
              onClick={() => setShowPayment(true)}
            >
              Place Order
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
              Confirm Payment
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
    background: "linear-gradient(135deg,#02040b,#07162f,#02040b)",
    color: "white"
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
    background: "#111",
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
    background: "red",
    border: "none",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  total: {
    marginTop: "30px",
    fontSize: "26px",
    color: "#d4af37"
  },

  orderBtn: {
    marginTop: "20px",
    padding: "14px",
    width: "100%",
    background: "#d4af37",
    border: "none",
    borderRadius: "10px"
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
    background: "#111",
    padding: "30px",
    borderRadius: "12px",
    color: "white",
    width: "320px",
    textAlign: "center"
  },

  methods: {
    display: "flex",
    gap: "10px",
    margin: "15px 0"
  },

  methodBtn: {
    flex: 1,
    padding: "10px",
    background: "#222",
    border: "none",
    color: "white",
    borderRadius: "8px"
  },

  active: {
    flex: 1,
    padding: "10px",
    background: "#d4af37",
    border: "none",
    color: "#111",
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
    background: "#222",
    color: "white"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  payBtn: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    background: "#6f8fff",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
  }
};