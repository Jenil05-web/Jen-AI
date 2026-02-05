import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env FIRST
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 8080;

console.log("🚀 Starting server...");
console.log(`📍 PORT: ${PORT}`);

// === MIDDLEWARE (in order) ===
app.use(cors()); // CORS FIRST - this is critical!
app.use(express.json());

// === HEALTH CHECK (always works) ===
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// === ROUTES ===
console.log("📦 Loading routes...");
app.use("/api", chatRoutes);
console.log("✅ Routes loaded successfully");

// === 404 HANDLER ===
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// === ERROR HANDLER ===
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// === START SERVER ===
const server = app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/health`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
});

// === CONNECT TO MONGODB (non-blocking) ===
import mongoose from "mongoose";

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("⚠️  MONGODB_URI not set - database features will not work");
      return;
    }
    
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB failed:", err.message);
    console.warn("⚠️  Server running WITHOUT database - API calls may fail");
  }
})();
