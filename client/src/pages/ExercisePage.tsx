import { useState } from 'react';
import { searchCaloriesBurned } from '../api/exerciseAPI';

interface Exercise {
  activity: string;
  duration: number;
  caloriesBurned: number;
}

const ExercisePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Exercise[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const data = await searchCaloriesBurned(query);
      setResults(
        data.map((item: { name: string; duration_minutes: number; total_calories: number }) => ({
          activity: item.name,
          duration: item.duration_minutes,
          caloriesBurned: item.total_calories,
        }))
      );
      setError('');
    } catch (err) {
      setError('Failed to fetch exercise data');
    }
  };

  const handleDelete = (activity: string) => {
    setResults(results.filter((exercise) => exercise.activity !== activity));
  };

  return (
    <div className="exercise-page">
      <h1>Search for Exercises</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter exercise name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="exercise-results">
        {results.map((exercise, index) => (
          <div key={index} className="exercise-item">
            <h3>{exercise.activity}</h3>
            <p>Duration: {exercise.duration} minutes</p>
            <p>Calories Burned: {exercise.caloriesBurned}</p>
            <button onClick={() => handleDelete(exercise.activity)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisePage;
