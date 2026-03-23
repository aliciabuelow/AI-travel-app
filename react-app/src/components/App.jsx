import '../styles/App.css'
import { useState } from 'react';
import UserInput from './UserInput.jsx';
import Itinerary from './Itinerary.jsx';
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
  <div className="container">
  <div className="App">
    <h1>Your trip, planned <span className="accented">instantly</span></h1>
    <h2>Generate a personalized travel itinerary based on your destination, style, and interests</h2>
    <UserInput onSubmit={handleUserInput} loading={loading} />
    <Itinerary userData={userData} itinerary={itinerary} loading={loading} error={error} />
  </div>
  </div>
  )
}