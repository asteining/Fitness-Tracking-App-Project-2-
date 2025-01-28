import { useState } from 'react';
import { searchFood } from '../api/foodAPI';


  interface Food { 
    fdcId: number; 
    labelNutrients: { calories: { value: number; }; }; } 
    // labelNutrients only appears for chicken FdcId number
    // steak and pork FdcId number does not have labelNutrients



const FoodPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Food | null>(null); // Explicitly typed
  // const [results, setResults] = useState({
  //   fdcId: 1662353, // Default fdcId
  //   labelNutrients: {
  //     calories: {
  //       value: 110, // Default calories value
  //     },
  //   },
  // });
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const fdcid = Number(query); // Convert query to number
    if (isNaN(fdcid)) {
      setError('Invalid FDC ID');
      return;
    }

    try {
      const data = await searchFood(fdcid);
      if (data) {
        const updatedData = {
          ...data,
          labelNutrients: {
            ...data.labelNutrients,
            calories: {
              value: data?.labelNutrients?.calories?.value ?? 0, // Use default value if undefined
            },
          },
        };
      
        setResults(updatedData);
        setError('');
        console.log(updatedData);
      }
      
    } catch (err) {
      setError('Failed to fetch food data');
    }
  };

  const handleDelete = async () => {
    setResults(null);

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
        {results &&  (
          <div key={results.fdcId} className="food-item">
            <h3>{results.fdcId}</h3>
            <p>Calories: {results.labelNutrients.calories.value}</p>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
