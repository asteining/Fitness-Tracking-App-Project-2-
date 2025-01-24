import { useState, useEffect } from 'react';
import { retrieveLocalExercises, searchWgerExercises } from '../api/exerciseAPI';

const ExercisePage = () => {
  const [localExercises, setLocalExercises] = useState<
  { id: number; exerciseType: string; hoursPerformed: number; caloriesBurned: number; }[]>([]);
  
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; description: string; }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLocalExercises = async () => {
      try {
        const exercises = await retrieveLocalExercises();
        setLocalExercises(exercises);
      } catch {
        setError(true);
      }
    };

    fetchLocalExercises();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const results = await searchWgerExercises(searchQuery);
      setSearchResults(results);
    } catch {
      setError(true);
    }
  };

  if (error) {
    return <p>Error loading exercises. Please try again later.</p>;
  }

  return (
    <div className="exercise-page">
      <h1>Exercise Tracker</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Search Results */}
      <div className="search-results">
        <h2>Search Results</h2>
        {searchResults.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
          </div>
        ))}
      </div>

      {/* Local Exercises */}
      <div className="local-exercises">
        <h2>Logged Exercises</h2>
        {localExercises.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <h3>{exercise.exerciseType}</h3>
            <p>Duration: {exercise.hoursPerformed} hrs</p>
            <p>Calories Burned: {exercise.caloriesBurned}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisePage;
