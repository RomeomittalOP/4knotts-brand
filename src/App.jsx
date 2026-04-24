// FILE: src/App.jsx
// FULL FILE REPLACE KAR DO
// Login / Signup / Dashboard routes add ho gaye

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import {
  AnimatePresence,
  motion
} from "framer-motion";

import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import WholesalePage from "./pages/WholesalePage";
import Customization from "./pages/Customization";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProductShowcase from "./components/ProductShowcase";
import BrandStatement from "./components/BrandStatement";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        {/* HOME */}
        <Route
          path="/"
          element={
            <PageTransition>
              <>
                <Home />
                <ProductShowcase />
                <BrandStatement />
              </>
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
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({
  children
}) {
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
    <Router>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;