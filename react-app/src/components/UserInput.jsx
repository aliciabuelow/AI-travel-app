import '../styles/UserInput.css'

export default function UserInput({ onSubmit, loading }) {

    function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);

        const data = {
            destination: formData.get("destination"),
            duration: formData.get("duration"),
            budget: formData.get("budget"),
            style: formData.get("style"),
            interests: formData.get("interests"),
        };

        onSubmit(data);
        event.target.reset();
    }

    return (
        <section className="UserInput" aria-label="Trip planning form">
            <form className="user-input" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label htmlFor="destination">Destination</label>
                        <input 
                            type="text"
                            id="destination" 
                            name="destination"
                            placeholder="Country, city, or region"
                            required 
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration (days)</label>
                        <input 
                            type="number" 
                            id="duration" 
                            name="duration" 
                            placeholder="5"
                            min="1"
                            max="30"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="budget">Budget</label>
                        <select name="budget" id="budget" defaultValue="mid-range">
                            <option value="backpacker">Backpacker</option>
                            <option value="mid-range">Mid-Range</option>
                            <option value="high-end">High-End</option>
                            <option value="luxury">Luxury</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="style">Travel Style</label>
                        <select name="style" id="style" defaultValue="balanced">
                            <option value="relaxed">Relaxed</option>
                            <option value="balanced">Balanced</option>
                            <option value="packed">Packed</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="interests">Interests</label>
                        <textarea 
                            name="interests" 
                            id="interests" 
                            placeholder="Museums, food, nightlife, culture, hiking..."
                            rows={3}
                            maxLength={200}
                            required
                        />
                    </div>

                    <div className="form-group full-width">
                        <button 
                            type="submit" 
                            id="generate" 
                            name="generate" 
                            disabled={loading}
                            aria-busy={loading}
                        >
                            <span className="button-content">
                                {loading && <span className="button-spinner" aria-hidden="true"></span>}
                                {loading ? "Generating..." : "Generate Itinerary"}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
