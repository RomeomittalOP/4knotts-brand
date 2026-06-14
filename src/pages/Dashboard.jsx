import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../lib/orders";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const orders = getOrders();

  const logoutUser = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <section style={styles.page}>
      <div style={styles.box}>
        <p style={styles.tag}>
          NOTED BY 4 KNOTTS DASHBOARD
        </p>

        <h1 style={styles.heading}>
          Hey, superstar ✨
        </h1>

        <p style={styles.email}>
          {user?.email || "User"}
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>My Orders</h3>
            <p>Track your bulk & retail hauls.</p>
          </div>

          <div style={styles.card}>
            <h3>Saved Faves</h3>
            <p>The stationery living in your head.</p>
          </div>

          <div style={styles.card}>
            <h3>Custom Requests</h3>
            <p>Your branding ideas, sorted.</p>
          </div>

          <div style={styles.card}>
            <h3>Account</h3>
            <p>Profile & vibe settings.</p>
          </div>
        </div>

        {/* ORDER HISTORY */}
        <div style={styles.ordersWrap}>
          <h3 style={styles.ordersTitle}>Order history</h3>
          {orders.length === 0 ? (
            <p style={styles.noOrders}>
              No orders yet. <Link to="/catalog" style={styles.link}>Start shopping →</Link>
            </p>
          ) : (
            orders.map((o) => (
              <div key={o.id} style={styles.orderRow}>
                <div>
                  <div style={styles.oid}>{o.id}</div>
                  <div style={styles.odate}>
                    {new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item(s) · {o.payment.method}
                  </div>
                </div>
                <div style={styles.oright}>
                  <span style={styles.ostatus}>{o.status}</span>
                  <b>₹{o.total}</b>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          style={styles.btn}
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#FAF7F1,#F2EDE3,#ece7f6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px"
  },

  box: {
    width: "100%",
    maxWidth: "1000px",
    background:
      "rgba(17,17,17,.05)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(14px)",
    color: "#221F1A"
  },

  tag: {
    color: "#2C2E6B",
    fontSize: "12px",
    letterSpacing: "3px"
  },

  heading: {
    marginTop: "10px",
    fontSize: "42px"
  },

  email: {
    color: "#666666",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px"
  },

  card: {
    background:
      "rgba(17,17,17,.04)",
    border:
      "1px solid rgba(17,17,17,.08)",
    borderRadius: "16px",
    padding: "24px"
  },

  btn: {
    marginTop: "28px",
    padding: "14px 22px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#3A3D85,#2C2E6B,#21224F)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer"
  },

  ordersWrap: { marginTop: "36px", textAlign: "left" },
  ordersTitle: { fontSize: "22px", marginBottom: "14px", color: "#221F1A" },
  noOrders: { color: "#7C766B" },
  link: { color: "#2C2E6B", fontWeight: 600, textDecoration: "none" },
  orderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    padding: "14px 16px",
    background: "#fff",
    border: "1px solid #EDE7DA",
    borderRadius: "12px",
    marginBottom: "10px",
  },
  oid: { fontWeight: 700, color: "#2C2E6B" },
  odate: { fontSize: "13px", color: "#7C766B", marginTop: "2px" },
  oright: { display: "flex", alignItems: "center", gap: "14px" },
  ostatus: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#1F5D4C",
    background: "#e6f2ec",
    padding: "4px 10px",
    borderRadius: "999px",
  },
};

export default Dashboard;