import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import WholesalePage from "./pages/WholesalePage";
import Customization from "./pages/Customization";

function App() {
  return (
    <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Catalog */}
        <Route path="/catalog" element={<Catalog />} />

        {/* Wholesale */}
        <Route path="/wholesale" element={<WholesalePage />} />

        {/* Customization */}
        <Route
          path="/customization"
          element={<Customization />}
        />

      </Routes>
    </Router>
  );
}

export default App;