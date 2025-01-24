const searchCaloriesBurned = async (activity: string, duration: number = 60) => {
  try {
    const response = await fetch(`/api/exercise/search?activity=${activity}&duration=${duration}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'Zid3HT7e7n0hODsA3+zZwg==SjDYLrqn0IYRUQl2',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch calories burned data from backend.');
    }

    return await response.json();
  } catch (err) {
    console.error('Error retrieving calories burned data:', err);
    throw err;
  }
};

export { searchCaloriesBurned };
