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
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 50% 0%, #0a1428, #02040b 70%)",
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
      "radial-gradient(circle, rgba(212,175,55,.16), transparent 65%)",
    filter: "blur(20px)",
  },
  box: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,.04)",
    padding: "40px 36px",
    borderRadius: "24px",
    border: "1px solid rgba(212,175,55,.18)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 30px 70px rgba(0,0,0,.5)",
    color: "white",
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
    fontFamily: "Cormorant Garamond, serif",
    fontWeight: 600,
  },
  sub: { color: "#9aa4bd", marginTop: "6px", marginBottom: "26px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.06)",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },
  btn: {
    marginTop: "6px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#f5d77a,#d4af37,#b99118)",
    color: "#111",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
    borderTop: "1px solid rgba(255,255,255,.1)",
    position: "relative",
  },
  dividerText: {
    position: "absolute",
    top: "-10px",
    background: "#070b16",
    padding: "0 12px",
    color: "#9aa4bd",
    fontSize: "13px",
  },
  googleBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.15)",
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
  bottom: { marginTop: "22px", color: "#9aa4bd", fontSize: "14px" },
  link: { color: "#d4af37", fontWeight: 600, textDecoration: "none" },
};

export default Signup;
