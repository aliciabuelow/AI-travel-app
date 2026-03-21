import '../styles/Itinerary.css'

export default function Itinerary({ userData, itinerary, loading, error }) {
    if (loading) {
        return <p>Generating itinerary...</p>;
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
            <h2>{formattedDestination} Itinerary</h2>

            <div className="itinerary-days">
                {dayCards.map((day, index) => (
                <div key={index} className="day-card">
                    <h3>{day.title}</h3>
                    <p>{day.text.trim()}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
    
}