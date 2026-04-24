// FILE: src/pages/Signup.jsx
// FULL FILE REPLACE KAR DO
// ✅ Premium Signup
// ✅ Email Signup
// ✅ Google Signup
// ✅ Phone OTP Signup
// ✅ Better UI
// ✅ Login page jaisa premium look

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [confirmObj, setConfirmObj] =
    useState(null);

  const [error, setError] =
    useState("");

  const [msg, setMsg] =
    useState("");

  // EMAIL SIGNUP
  const register = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/");

    } catch (error) {
      setError(error.message);
    }
  };

  // GOOGLE SIGNUP
  const googleSignup =
    async () => {
      try {
        const provider =
          new GoogleAuthProvider();

        await signInWithPopup(
          auth,
          provider
        );

        navigate("/");

      } catch (error) {
        setError(error.message);
      }
    };

  // PHONE OTP
  const sendOtp = async () => {
  try {
    setError("");

    window.recaptchaVerifier =
      new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {}
        },
        auth
      );

    const appVerifier =
      window.recaptchaVerifier;

    const result =
      await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

    setConfirmObj(result);
    setMsg("OTP Sent Successfully");

  } catch (error) {
    setError(error.message);
  }
};

  const verifyOtp =
    async () => {
      try {
        await confirmObj.confirm(
          otp
        );

        navigate("/");

      } catch (error) {
        setError(error.message);
      }
    };

  return (
    <section style={styles.page}>
      <div style={styles.box}>
        <h1>Create Account</h1>

        <p style={styles.sub}>
          Join 4 Knotts
        </p>

        {/* EMAIL */}
        <form
          onSubmit={register}
          style={styles.form}
        >
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button style={styles.btn}>
            Sign Up
          </button>
        </form>

        {/* GOOGLE */}
        <button
          style={styles.googleBtn}
          onClick={googleSignup}
        >
          Continue with Google
        </button>

        {/* PHONE */}
        <div style={styles.line}>
          OR Signup with Phone
        </div>

        <input
          style={styles.input}
          placeholder="+91XXXXXXXXXX"
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
        />

        <button
          style={styles.btn}
          onClick={sendOtp}
        >
          Send OTP
        </button>

        {confirmObj && (
          <>
            <input
              style={styles.input}
              placeholder="Enter OTP"
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
            />

            <button
              style={styles.btn}
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        <div
          id="recaptcha-container"
          style={{
            marginTop: "10px"
          }}
        ></div>

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        {msg && (
          <p style={styles.msg}>
            {msg}
          </p>
        )}

        <p style={styles.bottom}>
          Already user?{" "}
          <Link
            to="/login"
            style={styles.link}
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

const styles = {
  page:{
    minHeight:"100vh",
    background:
"linear-gradient(135deg,#02040b,#07162f,#0d2a52)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"20px"
  },

  box:{
    width:"100%",
    maxWidth:"430px",
    background:"rgba(255,255,255,.05)",
    padding:"40px",
    borderRadius:"18px",
    backdropFilter:"blur(14px)",
    color:"white"
  },

  sub:{
    color:"#b8b8b8",
    marginBottom:"24px"
  },

  form:{
    display:"flex",
    flexDirection:"column",
    gap:"14px"
  },

  input:{
    padding:"14px",
    borderRadius:"10px",
    border:"none",
    width:"100%",
    marginTop:"10px"
  },

  btn:{
    padding:"14px",
    borderRadius:"10px",
    border:"none",
    background:
"linear-gradient(135deg,#6f8fff,#4d6fff)",
    color:"white",
    marginTop:"10px",
    width:"100%"
  },

  googleBtn:{
    marginTop:"14px",
    width:"100%",
    padding:"14px",
    borderRadius:"10px",
    border:"none",
    background:"#fff",
    color:"#111"
  },

  line:{
    marginTop:"18px",
    color:"#9ca3af",
    textAlign:"center"
  },

  error:{
    color:"#ff8f8f",
    marginTop:"14px"
  },

  msg:{
    color:"#8fffaa",
    marginTop:"14px"
  },

  bottom:{
    marginTop:"20px",
    color:"#b8b8b8"
  },

  link:{
    color:"#6f8fff"
  }
};

export default Signup;