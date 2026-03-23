import '../styles/App.css'
import { useState } from 'react';
import UserInput from './UserInput.jsx';
import Itinerary from './Itinerary.jsx';
import HeroImage from '../assets/1314d726-6407-452c-a484-a10d7243222e.jfif';
import axios from 'axios';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUserInput(data) {
    setUserData(data);
    setError("");
    setItinerary("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/generate", data);
      console.log("API Response:", response.data)
      
      const result = response.data.itinerary;
      if (result.includes("INVALID_DESTINATION")) {
        setError("Please enter a valid destination.");
        return;
      }
      setItinerary(result);

    } catch (error) {
      setError("Sorry, something went wrong. Please try again.");
      console.error(error)
    }

    setLoading(false);
  }

  return (
  <div className="page-shell">
        <div className="hero-overlay">
    <img src={HeroImage} alt="beach and ocean waves" className="hero-image" />
      <div className="content-wrap">
        <header className="hero-text">
          <h1>
            Your trip, planned <span className="accented">instantly</span>
          </h1>
          <h2>
            Generate a personalized travel itinerary based on your trip details.
          </h2>
        </header>

        <UserInput onSubmit={handleUserInput} loading={loading} />
        <Itinerary
          userData={userData}
          itinerary={itinerary}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  </div>
);
}