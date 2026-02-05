import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());

// ========== HEALTH CHECK ==========
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// ========== ROUTES ==========
app.use("/api", chatRoutes);

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

// ========== MONGODB CONNECTION ==========
import mongoose from "mongoose";

(async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("⚠️  MONGODB_URI not set");
      return;
    }

    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB failed:", err.message);
  }
})();
