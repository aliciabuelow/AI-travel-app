import '../styles/Itinerary.css'
import { MapPin } from 'lucide-react';
import TypewriterLoading from './Typewriter.jsx';

export default function Itinerary({ userData, itinerary, loading, error }) {
    if (loading) {
        return <div className="loading-text">
            
        <TypewriterLoading />

        </div>;
    }

    if (error) {
        return <p>{error}</p>;
    }
   
    if (!itinerary) {
        return null;
    }

    const sections = itinerary.split("\n").filter((line) => line.trim() !== "");

    let currentDay = null;
    const dayCards = [];

    sections.forEach((line) => {
    if (line.startsWith("Day ")) {
        currentDay = {
        title: line,
        text: "",
        };
        dayCards.push(currentDay);
    } else if (currentDay) {
        currentDay.text += line + "\n";
    }
    });

    const formattedDestination =
        userData.destination
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    return (
        <div className="Itinerary">

           <div className="itinerary-card">
            <div className="itinerary-header">
                <MapPin size={23} className="map-pin" />
                <h2>{formattedDestination} Itinerary</h2>
            </div>

            <div className="itinerary-content">
                {dayCards.map((day, index) => {
                const titleLine = day.text
                .split("\n")
                .find((line) => line.toLowerCase().startsWith("title:"));

                const cleanTitle = titleLine
                ? titleLine.replace(/^title:/i, "").trim() || `Day ${index + 1}`
                : `Day ${index + 1}`;

                return (
                    <section key={index} className="day-block">
                    <div className="day-heading">
                    <div className="day-number">{index + 1}</div>
                    <h3>{cleanTitle}</h3>
                    </div>

      <div className="day-text">
        {day.text
          .trim()
          .split("\n")
          .filter((line) => {
            const lower = line.toLowerCase();
            return line.trim() !== "" && !lower.startsWith("title:");
          })
          .map((line, lineIndex) => {
            const parts = line.split(":");
            if (parts.length > 1) {
              return (
                <div key={lineIndex} className="day-row">
                  <span className="day-label">{parts[0]}:</span>
                  <span className="day-value">{parts.slice(1).join(":").trim()}</span>
                </div>
              );
            }

            return <p key={lineIndex}>{line}</p>;
          })}
      </div>
    </section>
  );
})}
            </div>
            </div>

        </div>
    )
    
}