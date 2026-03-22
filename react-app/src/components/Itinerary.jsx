import '../styles/Itinerary.css'

export default function Itinerary({ userData, itinerary, loading, error }) {
    if (loading || error || !itinerary) {
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

    const formattedDestination = userData?.destination
        ? userData.destination
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "Your";

    const extractDayNumber = (title) => {
        const match = title.match(/Day (\d+)/);
        return match ? match[1] : "";
    };

    const formatDayTitle = (title) => {
        return title.replace(/^Day \d+:?\s*/, "").trim() || "Explore";
    };

    return (
        <section className="Itinerary" aria-label="Generated itinerary">
            <article className="itinerary-card">
                <header className="itinerary-header">
                    <h2>{formattedDestination} Itinerary</h2>
                    <div className="trip-meta">
                        <span>{dayCards.length} {dayCards.length === 1 ? 'day' : 'days'}</span>
                        {userData?.budget && (
                            <span>{userData.budget.charAt(0).toUpperCase() + userData.budget.slice(1)}</span>
                        )}
                    </div>
                </header>

                <div className="itinerary-days">
                    {dayCards.map((day, index) => (
                        <article key={index} className="day-card">
                            <h3>
                                <span className="day-badge" aria-label={`Day ${extractDayNumber(day.title)}`}>
                                    {extractDayNumber(day.title)}
                                </span>
                                {formatDayTitle(day.title) || day.title}
                            </h3>
                            <p>{day.text.trim()}</p>
                        </article>
                    ))}
                </div>
            </article>
        </section>
    );
}
