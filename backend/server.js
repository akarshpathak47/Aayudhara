const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load env vars only in local development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const donorRoutes = require("./routes/donorRoutes");
const otpRoutes = require("./routes/otp");

app.use("/api/donor", donorRoutes);
app.use("/api/otp", otpRoutes);

// -------------------
// Serve React Frontend (FIXED FOR NODE 20)
// -------------------
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all handler (DO NOT use app.get("*"))
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/build", "index.html")
  );
});

// -------------------
// MongoDB Connection & Server Start
// -------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
