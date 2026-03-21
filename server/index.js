require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { destination, duration, budget, style, interests } = req.body;

  const prompt = `
Create a ${duration}-day travel itinerary for ${destination}.

Budget: ${budget}
Travel style: ${style}
Interests: ${interests}

Rules:
- Write only the itinerary
- Do not include a title or introduction
- Do not include a conclusion
- Do not use markdown
- Do not use bullet points
- Do not use asterisks or symbols
- Format as:
Day 1 
Morning: 
Afternoon: 
Evening: 
Estimated cost: 
Tips: 

Day 2 
Morning: 
Afternoon: 
Evening: 
Estimated cost: 
Tips: 

Keep each day concise and practical.
If the destination is not a real place, respond with: 
INVALID_DESTINATION
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const itinerary = response.output[0].content[0].text;

    res.json({ itinerary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});