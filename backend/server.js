const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const wholesaleRoutes = require("./routes/wholesaleRoutes");
const customizationRoutes = require("./routes/customizationRoutes");
const catalogRoutes = require("./routes/catalogRoutes");

const app = express();

/* DB CONNECT */
connectDB();

/* CORS FIX */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* BODY PARSER */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FOLDER */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ROUTES */
app.use("/api/wholesale", wholesaleRoutes);
app.use("/api/customization", customizationRoutes);
app.use("/api/catalog", catalogRoutes);

/* HOME ROUTE */
app.get("/", (req, res) => {
  res.send("4 KNOTTS Backend Running 🚀");
});

/* SERVER START */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});