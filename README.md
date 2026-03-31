# ✈️ AI Travel Itinerary Builder

Welcome to my full-stack travel planner, utilizing AI to generate realistic, season-aware itineraries tailored to the user's destination, budget, travel style, and interests.

## Live Demo
https://ai-travel-app-mauve.vercel.app/

--

## Overview

This application generates personalized multi-day travel itineraries based on user input (incl. destination, duration, travel style, budget, timing, and group type).
Each itinerary is structured into daily plans with themed titles, time-of-day breakdowns, estimated daily cost, and practical tips. The output is formatted and designed to feel realistic and easy to read.

--

## Features

- AI-generated, personalized multi-day itineraries
- Structured daily plans with titles, time-of-day sections, cost estimates, tips
- Season-aware recommendations based on user-inputted travel timing
- Clean, responsive UI with interactive inputs and loading states
- Full-stack architecture with frontend-backend API communication

--

## Tech Stack

- React (Vite)
- JavaScript
- Node.js
- Express
- OpenAI API
- CSS3
- Vercel (frontend) & Render (backend)

--

## Challenges/Learning

- Getting AI output into a **consistent, usable format** was much harder than expected. I had to tweak the prompt multiple times to ensure the response structure could be reliably parsed and displayed in the UI.
- Early versions of the app returned variations of **unrealistic itineraries**, so I refined the prompt to prioritize seasonality and remove conditional or vague suggestions.
- I attempted to include "helpful links" for each daily plan, but removed them entirely after discovering that the AI would **hallucinate or guess URLs**, which highlighted the importance of understanding the current limitations of AI-generated content.
- Debugging API issues (network errors, incorrect endpoints, and environment variables) helped me understand how **frontend and backend services communicate in a real application**.
- Deploying the app across Vercel and Render introduced totally new challenges to me, including **environment variable configuration, route handling, and debugging production errors**.
- From a design perspective, I spent ample time refining spacing, hierarchy, and layout to ensure users could **easily scan** their itineraries without being overwhelmed, which significantly improved usability.
