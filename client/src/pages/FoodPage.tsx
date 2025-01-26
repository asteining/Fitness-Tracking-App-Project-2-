import { useState } from 'react';
import { searchFood, deleteFood } from '../api/foodAPI';

interface Food {
    fdcid: number;
    Nutrients: number; // Calories
    }

const FoodPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Food[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const fdcid = Number(query); // Convert query to number
    if (isNaN(fdcid)) {
      setError('Invalid FDC ID');
      return;
    }

    try {
      const data = await searchFood(fdcid);
      if (data) {setResults(data); setError('');}
      
    } catch (err) {
      setError('Failed to fetch food data');
    }
  };

  const handleDelete = async (fdcid: number) => {
    try {
      await deleteFood(fdcid);
      setResults(results.filter((food) => food.fdcid !== fdcid));
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
        {results && results.map((food) => (
          <div key={food.fdcid} className="food-item">
            <h3>{food.fdcid}</h3>
            <p>Calories: {food.Nutrients}</p>
            <button onClick={() => handleDelete(food.fdcid)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
