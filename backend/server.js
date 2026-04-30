const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const wholesaleRoutes = require("./routes/wholesaleRoutes");
const customizationRoutes = require("./routes/customizationRoutes");
const catalogRoutes = require("./routes/catalogRoutes");

const app = express();
const orderRoutes = require("./routes/orderRoutes");

connectDB();

// SIMPLE CORS (safe)
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/wholesale", wholesaleRoutes);
app.use("/api/customization", customizationRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/order", orderRoutes);
app.get("/", (req, res) => {
  res.send("4 KNOTTS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});