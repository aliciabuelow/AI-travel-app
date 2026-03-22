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
      
      const result = response.data.itinerary;
      if (result.includes("INVALID_DESTINATION")) {
        setError("Please enter a valid destination.");
        setLoading(false);
        return;
      }
      setItinerary(result);

    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <main className="App">
      <header className="header">
        <h1>Discover the world <span className="highlight">with us</span></h1>
        <h2>Create personalized travel itineraries tailored to your adventure</h2>
      </header>
      
      <UserInput onSubmit={handleUserInput} loading={loading} />
      
      {loading && (
        <div className="status-message">
          <div className="spinner" aria-hidden="true"></div>
          <span>Creating your itinerary...</span>
        </div>
      )}
      
      {error && !loading && (
        <div className="status-message error" role="alert">
          <span>{error}</span>
        </div>
      )}
      
      <Itinerary userData={userData} itinerary={itinerary} loading={loading} error={error} />
    </main>
  );
}
