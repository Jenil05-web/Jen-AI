import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

//Test

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "test123",
      title: "Test Thread",
      messages: [],
    });
    const response = await thread.save();
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
  }
});
router.get("/threads",async(req,res)=>{
    try{
        console.log("📝 Fetching threads...");
        const threads = await Thread.find().sort({updatedAt : -1});
        console.log(`✅ Found ${threads.length} threads`);
        res.json(threads);

    }
    catch(err){
        console.error("❌ Error fetching threads:", err.message);
        console.error("Stack:", err.stack);
        res.status(500).json({error: "Failed to fetch threads", details: err.message});
    }
})

router.get("/threads/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({error: "Thread not found"});
    }
    
    res.json(thread);
  } catch (err) {
    console.error("❌ Error fetching thread:", err.message);
    res.status(500).json({error: "Failed to fetch thread", details: err.message});
  }
});
router.delete("/threads/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOneAndDelete({ threadId });
    if (!thread) {
      return res.status(404).json({error: "Thread not found"});
    }
    res.json({success: true, message: "Thread deleted successfully"});
  } catch (err) {
    console.error("❌ Error deleting thread:", err.message);
    res.status(500).json({error: "Failed to delete thread", details: err.message});
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({error: "Bad Request: missing threadId or message"});
  }
  try {
    console.log(`💬 Processing chat - threadId: ${threadId}, message: ${message.substring(0, 30)}...`);
    
    let thread = await Thread.findOne({ threadId });
    console.log(`📌 Thread found: ${!!thread}`);

    // Create new thread if it doesn't exist
    if (!thread) {
      console.log("🆕 Creating new thread...");
      thread = new Thread({
        threadId,
        title: message.substring(0, 20),
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
      thread.updatedAt = Date.now();
    }

    console.log("🤖 Calling OpenAI API...");
    const aiResponse = await getOpenAIAPIResponse(message);
    console.log(`✅ OpenAI response: ${aiResponse.substring(0, 50)}...`);
    
    thread.messages.push({ role: "assistant", content: aiResponse });
    thread.updatedAt = Date.now();
    
    console.log("💾 Saving thread to database...");
    await thread.save();
    console.log("✅ Thread saved successfully");
    
    res.json(thread);
  } catch (err) {
    console.error("❌ Error in chat:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({error: "Failed to process chat", details: err.message});
  }
});
export default router;
