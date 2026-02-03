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
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173', // local development
    'http://localhost:3000',  // local development
    process.env.FRONTEND_URL  // production frontend URL
  ],
  credentials: true
}));

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

//connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected !");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};
