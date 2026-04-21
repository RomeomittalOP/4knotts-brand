import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import WholesalePage from "./pages/WholesalePage";
import Customization from "./pages/Customization";

/* Premium Page Transition Wrapper */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

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
      </Routes>
    </AnimatePresence>
  );
}

/* Animation Style */
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
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;