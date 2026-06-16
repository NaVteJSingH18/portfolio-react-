const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blog.routes");

const app = express();

// 1. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const defaultOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const configuredOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...defaultOrigins, ...configuredOrigins]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  }
}));

// 2. Routes
app.use("/api/blogs", blogRoutes);

// 3. Database Connection & Server Start (Graceful Startup)
mongoose.connect(`mongodb://127.0.0.1:27017/portfolio`)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    
    // Only start listening for requests AFTER the database is connected
    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

module.exports = app;