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
  const { destination, duration, travelDate, group, budget, style, interests } = req.body;

  const prompt = `
Create a realistic, season-aware ${duration}-day travel itinerary for ${destination}.

Travel month/timeframe: ${travelDate}
Group type: ${group}
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
- Do not provide alternative seasonal options or conditional suggestions (e.g. "in summer..." or "if winter..."). Only include recommendations that match the given month(s) of travel.
- Treat the provided travel month or timeframe as fixed and certain, not optional
- Seasonality and weather should strongly influence the itinerary, not just slightly adjust it
- Before choosing activities, consider what is most appropriate and enjoyable in that destination during that time of travel
- Prioritize activities, events, food, and experiences that are especially relevant to the season
- Include well-known seasonal experiences that a traveler would reasonably expect in that destination and time of year
- Avoid recommending activities that are unpleasant, impractical, or low-value for the season unless they are major highlights and still realistic
- For cold, rainy, snowy, or very hot seasons, balance outdoor sightseeing with indoor activities and comfort breaks
- Avoid vague recommendations
- Keep each day realistic and geographically sensible
- Minimize unnecessary travel time between activities within a day
- A "relaxed" style should have downtime, "balanced" includes some leisure, and "packed" should be full of activities
- Consider the group type when suggesting activities
- Estimated cost should be a realistic daily range in local currency
- Provide practical tips specific to each day
- The Title should be a short, descriptive phrase (not "Day 1", not generic)
- Use the exact labels: Day, Title, Morning, Afternoon, Evening, Estimated cost, Tips
- Do not add any extra text before, after, or between days
- Follow this format EXACTLY for each day

Format:

Day 1
Title:
Morning:
Afternoon:
Evening:
Estimated cost:
Tips:

Day 2
Title:
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