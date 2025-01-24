import { useState } from 'react';
import { searchFood, deleteFood } from '../api/foodAPI';

interface Food {
    id: string;
    name: string;
    Calories: number;
    }

const FoodPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Food[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await searchFood(query);
      setResults(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch food data');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFood(id);
      setResults(results.filter((food) => food.id !== id));
    } catch (err) {
      setError('Failed to delete food');
    }
  };

  return (
    <div className="food-page">
      <h1>Search for Food</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter food name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="food-results">
        {results.map((food) => (
          <div key={food.id} className="food-item">
            <h3>{food.name}</h3>
            <p>Calories: {food.Calories}</p>
            <button onClick={() => handleDelete(food.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
