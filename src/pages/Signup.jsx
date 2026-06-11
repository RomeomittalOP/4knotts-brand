import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo-cutout.png";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password thoda strong rakho — at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords match nahi kar rahe.");
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.glow} />

      <div style={styles.box}>
        <img src={logo} alt="Noted By 4 Knotts" style={styles.logo} />

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.sub}>Join the Noted fam ✨</p>

        <form onSubmit={register} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button style={styles.btn} disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>or</span>
        </div>

        <button style={styles.googleBtn} onClick={googleSignup}>
          <span style={styles.gIcon}>G</span> Continue with Google
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.bottom}>
          Already a member?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

        <Link to="/" style={styles.skip}>
          Skip for now — just browsing →
        </Link>
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 50% 0%, #F2EDE3, #FAF7F1 70%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(44,46,107,.16), transparent 65%)",
    filter: "blur(20px)",
  },
  box: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "44px 38px",
    borderRadius: "24px",
    border: "1px solid #EDE7DA",
    boxShadow: "0 30px 70px rgba(0,0,0,.1)",
    color: "#221F1A",
    textAlign: "center",
  },
  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    background: "#fff",
    padding: "6px",
    boxSizing: "border-box",
    objectFit: "contain",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "30px",
    fontFamily: "Fraunces, serif",
    fontWeight: 600,
  },
  sub: { color: "#7C766B", marginTop: "6px", marginBottom: "26px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(17,17,17,.1)",
    background: "rgba(17,17,17,.06)",
    color: "#221F1A",
    fontSize: "15px",
    outline: "none",
  },
  btn: {
    marginTop: "6px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#3A3D85,#2C2E6B,#21224F)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
    borderTop: "1px solid rgba(17,17,17,.1)",
    position: "relative",
  },
  dividerText: {
    position: "absolute",
    top: "-10px",
    background: "#FAF7F1",
    padding: "0 12px",
    color: "#7C766B",
    fontSize: "13px",
  },
  googleBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "1px solid rgba(17,17,17,.15)",
    background: "#fff",
    color: "#111",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  gIcon: {
    fontWeight: 800,
    color: "#4285F4",
    fontSize: "17px",
  },
  error: {
    color: "#ff9a9a",
    marginTop: "16px",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  bottom: { marginTop: "22px", color: "#7C766B", fontSize: "14px" },
  link: { color: "#2C2E6B", fontWeight: 600, textDecoration: "none" },
  skip: {
    display: "inline-block",
    marginTop: "14px",
    color: "#7C766B",
    fontSize: "13px",
    textDecoration: "none",
  },
};

export default Signup;
