import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env FIRST
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 8080;

console.log("🚀 Starting server...");
console.log(`📍 PORT: ${PORT}`);
console.log(`🔒 CORS: Enabled for all origins`);

// === MIDDLEWARE (in order) ===
app.use(cors()); // CORS FIRST
app.use(express.json());

// === ROUTES ===
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Only import routes if they exist
try {
  import("./routes/chat.js").then(({ default: chatRoutes }) => {
    app.use("/api", chatRoutes);
    console.log("✅ Chat routes loaded");
  }).catch(err => {
    console.error("⚠️  Chat routes failed to load:", err.message);
  });
} catch (err) {
  console.error("⚠️  Error loading routes:", err.message);
}

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

// === CONNECT TO MONGODB (non-blocking) ===
import mongoose from "mongoose";

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("⚠️  MONGODB_URI not set");
      return;
    }
    
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("ℹ️  Server will continue running without database");
  }
})();
