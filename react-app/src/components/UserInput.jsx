import { useState } from 'react';
import '../styles/UserInput.css'

export default function UserInput({ onSubmit, loading }) {
    const [selectedStyle, setSelectedStyle] = useState("relaxed");
    const [selectedBudget, setSelectedBudget] = useState("budget-friendly");
    const [selectedGroup, setSelectedGroup] = useState("solo");

    function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);

        const data = {
            destination: formData.get("destination"),
            duration: formData.get("duration"),
            budget: formData.get("budget"),
            style: formData.get("style"),
            interests: formData.get("interests"),
            travelDate: formData.get("travelDate"),
            group: formData.get("group"),
        };
        console.log(data);
        onSubmit(data); //sending data up
    }

    return (
  <section className="user-input-card">
    <form className="user-input" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="e.g., country, city, region"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (in days)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            placeholder="e.g., 5"
            min="1"
            required
          />
        </div>
      </div>

    <div className="form-row">
      <div className="form-group">
        <label>When are you travelling?</label>
        <input 
            type="text" 
            id="travel-date"
            name="travelDate" 
            placeholder="e.g., December, late December, early spring, July 2029"
             />
      </div>

        <div className="form-group">
          <label>Who is travelling?</label>
          <div className="pill-group">
            {[
              { label: "Solo", value: "solo" },
              { label: "Couple", value: "couple" },
              { label: "Friends", value: "friends" },
              { label: "Family", value: "family" }
            ].map((group) => (
              <button
                key={group.value}
                type="button"
                className={`pill-button ${selectedGroup === group.value ? "active" : ""}`}
                onClick={() => setSelectedGroup(group.value)}
              >
                {group.label}
              </button>
            ))}
          </div>
          <input type="hidden" name="group" value={selectedGroup} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Budget</label>
          <div className="pill-group">
            {[
              { label: "Budget-friendly", value: "budget-friendly" },
              { label: "Mid-range", value: "mid-range" },
              { label: "Luxury", value: "luxury" }
            ].map((budget) => (
              <button
                key={budget.value}
                type="button"
                className={`pill-button ${selectedBudget === budget.value ? "active" : ""}`}
                onClick={() => setSelectedBudget(budget.value)}
              >
                {budget.label}
              </button>
            ))}
          </div>
          <input type="hidden" name="budget" value={selectedBudget} />
        </div>

        <div className="form-group">
          <label>Travel Style</label>
          <div className="pill-group">
            {["relaxed", "balanced", "packed"].map((style) => (
              <button
                key={style}
                type="button"
                className={`pill-button ${selectedStyle === style ? "active" : ""}`}
                onClick={() => setSelectedStyle(style)}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
          <input type="hidden" name="style" value={selectedStyle} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="interests">Interests</label>
        <textarea
          name="interests"
          id="interests"
          placeholder="e.g., museums, food, nightlife, culture, relaxation, hiking"
          rows={1}
          maxLength={100}
          required
        ></textarea>
      </div>

      <button type="submit" id="generate" name="generate" disabled={loading}>
        {loading ? "Generating" : "Generate Itinerary"}
      </button>
    </form>
  </section>
);
}