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
Create a realistic, highly specific ${duration}-day travel itinerary for ${destination}.

Travel month/timeframe: ${travelDate}
Group type: ${group}
Budget: ${budget}
Travel style: ${style}
Interests: ${interests}

Rules:
- Write only the itinerary
- Do not include a main title
- Do not include an introduction
- Do not include a conclusion
- Do not use markdown
- Do not use bullet points
- Do not use asterisks or symbols
- Do not add any text before the first day or after the last day

Formatting rules:
- Follow the format exactly
- Every day must include these lines in this exact order:
  Day X
  Title: ...
  Morning: ...
  Afternoon: ...
  Evening: ...
  Estimated cost: ...
  Tips: ...
- Never skip the Title line
- The Title must always appear on the same line as "Title:"
- The Title must be a short themed heading for that day
- The Title must not be "Day 1", "Day 2", etc.
- Do not combine labels onto one line
- Do not omit any label

Season and realism rules:
- Treat the provided travel month/timeframe as fixed and certain
- Build the itinerary for that exact time of year only
- Do not mention other seasons
- Do not give conditional advice such as "if in spring" or "in summer"
- Prioritize experiences, food, events, and attractions that are especially relevant to that destination during that time of year
- If the destination is known for major seasonal highlights during that month, include them prominently
- Avoid generic recommendations when a more seasonally relevant option exists
- Keep each day realistic and geographically sensible
- Minimize unnecessary travel time within each day
- Consider the group type when suggesting activities
- A relaxed style should include downtime, a balanced style should include some leisure, and a packed style should feel full
- Do not mention weather conditions that are uncertain or not strongly typical for that destination and month
- Make recommendations based on realistic opening hours and typical visiting times where possible
- Only mention real, well-known places or clearly generic categories (e.g., "a local ramen shop"); avoid inventing specific business names unless they are widely known landmarks
- Keep locations within each day geographically close and logically ordered to minimize travel time
- Avoid unnecessary travel across distant neighborhoods within the same day unless clearly justified

Detail rules:
- Make each Morning, Afternoon, and Evening section 2-3 sentences long
- Be specific about places, foods, neighborhoods, or experiences where possible
- Estimated cost should be a realistic daily range in local currency and say "per person"
- Tips should be practical and specific to that exact day

Follow this format exactly:

Day 1
Title: ...
Morning: ...
Afternoon: ...
Evening: ...
Estimated cost: ...
Tips: ...

Day 2
Title: ...
Morning: ...
Afternoon: ...
Evening: ...
Estimated cost: ...
Tips: ...

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