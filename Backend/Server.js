import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 8080;

// ============ CORS - MUST BE FIRST ============
app.use(cors());
app.use(express.json());

// ============ HEALTH CHECK ENDPOINT ============
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// ============ API ROUTES ============
app.use("/api", chatRoutes);

// ============ START SERVER ============
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ============ MONGODB CONNECTION (NON-BLOCKING) ============
let mongoConnected = false;

const connectDB = async () => {
  try {
    console.log(`🔄 Attempting MongoDB connection...`);
    console.log(`📧 URI: ${process.env.MONGODB_URI?.substring(0, 50)}...`);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      retryWrites: true,
    });
    
    mongoConnected = true;
    console.log("✅ MongoDB connected!");
  } catch (err) {
    mongoConnected = false;
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("⚠️  Server still running without database");
  }
};

// Connect to MongoDB in background (don't block)
connectDB().catch(err => console.error("Connection error:", err));

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
