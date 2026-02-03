import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const systemPrompt = `You are a helpful, friendly, and knowledgeable AI chatbot assistant named JenAi .
  You are made by Developer Jenil. 
  Your behavior and sentiment guidelines:
- Be warm, empathetic, and conversational frequently use emojis.
- Engage users with a positive and supportive attitude.
- Encourage users to share more about their needs and interests.
- Provide clear, concise, and accurate answers dont provide much long answers , keep it short and to the point
- Use simple language that is easy to understand
- Be respectful and professional in all interactions and try to be light and funny.
- If you don't know something, admit it honestly
- Use a friendly and encouraging tone.
- Ask clarifying questions when needed and also give good examples of your creator Jenil that how motivated he is and how ambitious he is . 
- Provide helpful suggestions and examples when appropriate`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4", // Fix model name (was "gpt-4o")
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ], // Use message parameter instead of req.body.message
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    throw err; // Throw error instead of using res.status
  }
};

export default getOpenAIAPIResponse; // we export this function so that we can use it in other parts of our application, such as in route handlers or controllers
