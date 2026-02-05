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

//connect to mongoDB - declare first
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected !");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    // Don't crash server, just log error
  }
};

const app = express();
const PORT = process.env.PORT || 8080;

// CORS MUST be before other middleware
app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//connect to mongoDB - non-blocking
connectDB().catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});
