import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <section style={styles.page}>
      <div style={styles.box}>
        <p style={styles.tag}>
          4 KNOTTS DASHBOARD
        </p>

        <h1 style={styles.heading}>
          Welcome Back
        </h1>

        <p style={styles.email}>
          {user?.email || "User"}
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>My Orders</h3>
            <p>Track your bulk & retail orders.</p>
          </div>

          <div style={styles.card}>
            <h3>Saved Products</h3>
            <p>Your favourite stationery items.</p>
          </div>

          <div style={styles.card}>
            <h3>Custom Requests</h3>
            <p>Manage branding enquiries.</p>
          </div>

          <div style={styles.card}>
            <h3>Account</h3>
            <p>Profile & preferences settings.</p>
          </div>
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
      "linear-gradient(135deg,#02040b,#07162f,#0d2a52)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px"
  },

  box: {
    width: "100%",
    maxWidth: "1000px",
    background:
      "rgba(255,255,255,.05)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(14px)",
    color: "white"
  },

  tag: {
    color: "#6f8fff",
    fontSize: "12px",
    letterSpacing: "3px"
  },

  heading: {
    marginTop: "10px",
    fontSize: "42px"
  },

  email: {
    color: "#b8b8b8",
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
      "rgba(255,255,255,.04)",
    border:
      "1px solid rgba(255,255,255,.08)",
    borderRadius: "16px",
    padding: "24px"
  },

  btn: {
    marginTop: "28px",
    padding: "14px 22px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#6f8fff,#4d6fff)",
    color: "white",
    cursor: "pointer"
  }
};

export default Dashboard;