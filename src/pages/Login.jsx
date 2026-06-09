import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ EMAIL LOGIN
  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ GOOGLE LOGIN
  const googleLogin = async () => {
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ FORGOT PASSWORD
  const forgotPassword = async () => {
    if (!email) {
      setError("Enter email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Reset email sent 📩");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ SEND OTP (FIXED)
  const sendOtp = async () => {
    try {
      setError("");
      setMsg("");

      // 🔥 Create Recaptcha only once
    if (window.recaptchaVerifier) {
  window.recaptchaVerifier.clear();
}

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  { size: "normal" }
);
      const appVerifier = window.recaptchaVerifier;

      // 🔥 Clean number
      const cleanPhone = phone.replace(/\D/g, "");

      const formattedPhone = cleanPhone.startsWith("91")
        ? `+${cleanPhone}`
        : `+91${cleanPhone}`;

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      setConfirmObj(confirmation);
      setMsg("OTP Sent 🚀");

    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  // ✅ VERIFY OTP
  const verifyOtp = async () => {
    try {
      setError("");

      if (!confirmObj) {
        setError("Send OTP first");
        return;
      }

      await confirmObj.confirm(otp);
      setMsg("Login Successful ✅");
      navigate("/");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.box}>
        <h1>Login</h1>
        <p style={styles.sub}>Welcome back, superstar ✨</p>

        {/* EMAIL LOGIN */}
        <form onSubmit={loginUser} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.btn}>Login</button>
        </form>

        {/* GOOGLE */}
        <button style={styles.googleBtn} onClick={googleLogin}>
          Continue with Google
        </button>

        {/* PHONE LOGIN */}
        <div style={styles.line}>OR Login with Phone</div>

        <input
          style={styles.input}
          placeholder="+91XXXXXXXXXX"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button style={styles.btn} onClick={sendOtp}>
          Send OTP
        </button>

        {confirmObj && (
          <>
            <input
              style={styles.input}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button style={styles.btn} onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {/* 🔥 RECAPTCHA */}
        <div id="recaptcha-container" style={{ marginTop: "10px" }}></div>

        <p style={styles.forgot} onClick={forgotPassword}>
          Forgot Password?
        </p>

        {error && <p style={styles.error}>{error}</p>}
        {msg && <p style={styles.msg}>{msg}</p>}

        <p style={styles.bottom}>
          New user?{" "}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#02040b,#07162f,#0d2a52)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  box: {
    width: "100%",
    maxWidth: "430px",
    background: "rgba(255,255,255,.05)",
    padding: "40px",
    borderRadius: "18px",
    backdropFilter: "blur(14px)",
    color: "white"
  },

  sub: {
    color: "#b8b8b8",
    marginBottom: "24px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    marginTop: "10px"
  },

  btn: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#6f8fff,#4d6fff)",
    color: "white",
    marginTop: "10px",
    cursor: "pointer"
  },

  googleBtn: {
    marginTop: "14px",
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#fff",
    color: "#111",
    cursor: "pointer"
  },

  line: {
    marginTop: "18px",
    color: "#9ca3af",
    textAlign: "center"
  },

  forgot: {
    marginTop: "16px",
    color: "#6f8fff",
    cursor: "pointer"
  },

  error: {
    color: "#ff8f8f",
    marginTop: "14px"
  },

  msg: {
    color: "#8fffaa",
    marginTop: "14px"
  },

  bottom: {
    marginTop: "20px",
    color: "#b8b8b8"
  },

  link: {
    color: "#6f8fff"
  }
};

export default Login;