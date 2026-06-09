// FILE: src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import {
  AnimatePresence,
  motion
} from "framer-motion";

import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// 🔥 PAGES
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import WholesalePage from "./pages/WholesalePage";
import Customization from "./pages/Customization";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Terms from "./pages/Terms"; // ✅ ADD THIS

// 🔥 COMPONENTS
import IntroLoader from "./components/IntroLoader";
import CartToast from "./components/CartToast";
import ScrollProgress from "./components/ScrollProgress";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* HOME */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        {/* OTHER PAGES */}
        <Route
          path="/catalog"
          element={
            <PageTransition>
              <Catalog />
            </PageTransition>
          }
        />

        <Route
          path="/wholesale"
          element={
            <PageTransition>
              <WholesalePage />
            </PageTransition>
          }
        />

        <Route
          path="/customization"
          element={
            <PageTransition>
              <Customization />
            </PageTransition>
          }
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          }
        />

        {/* 🔥 TERMS (FIX) */}
        <Route
          path="/terms"
          element={
            <PageTransition>
              <Terms />
            </PageTransition>
          }
        />

        {/* 🔥 404 FALLBACK */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />

      </Routes>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "14px",
        background: "linear-gradient(135deg,#02040b,#07162f,#02040b)",
        color: "white",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1 style={{ fontSize: "96px", margin: 0, color: "#d4af37" }}>404</h1>
      <p style={{ fontSize: "20px", opacity: 0.8 }}>
        Yeh page maujood nahi hai.
      </p>
      <Link
        to="/"
        style={{
          marginTop: "10px",
          padding: "12px 28px",
          borderRadius: "40px",
          background: "#d4af37",
          color: "#111",
          textDecoration: "none",
          fontWeight: 600
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        filter: "blur(8px)"
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      }}
      exit={{
        opacity: 0,
        y: -20,
        filter: "blur(8px)"
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <>
      <IntroLoader />
      <ScrollProgress />

      <Router>
        <AuthProvider>
          <AnimatedRoutes />
          <CartToast />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;