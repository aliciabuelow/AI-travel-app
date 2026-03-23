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

        onSubmit(data); //sending data up
        event.target.reset();
    }

    return (
        <div className="UserInput">
            <form className="user-input" onSubmit={handleSubmit}>
                <label htmlFor="destination">Destination</label>
                <input 
                type="text"
                id="destination" 
                name="destination"
                placeholder="e.g., country, city, region"
                required 
                 />

                 <label htmlFor="duration">Duration (in days)</label>
                 <input 
                 type="number" 
                 id="duration" 
                 name="duration" 
                 placeholder="e.g., 5"
                 min="1"
                 required
                 />

                 <label htmlFor="budget">Budget</label>
                 <select name="budget" id="budget">
                    <option value="backpacker">Backpacker</option>
                    <option value="budget-friendly">Budget-Friendly</option>
                    <option value="Mid-range">Mid-range</option>
                    <option value="luxury">Luxury</option>
                 </select>

                 <label htmlFor="style">Travel Style</label>
                 <select name="style" id="style">
                    <option value="relaxed">Relaxed</option>
                    <option value="balanced">Balanced</option>
                    <option value="packed">Packed</option>
                 </select>

                 <label htmlFor="interests">Interests</label>
                 <textarea 
                 name="interests" 
                 id="interests" 
                 placeholder="e.g., museums, food, nightlife, culture, relaxation, hiking"
                 rows={2}
                 maxLength={100}
                 required
                 >
                 </textarea>
                 <button type="submit" id="generate" name="generate" disabled={loading}>
                    {loading ? "Generating" : "Generate Itinerary"}
                 </button>
            </form>
        </div>
    )
}