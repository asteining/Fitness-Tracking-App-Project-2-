const searchCaloriesBurned = async (activity: string, duration: number = 60) => {
  if (!activity.trim()) {
    throw new Error('Activity cannot be empty');
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&duration=${duration}`, {
      headers: {
        'Accept': '*/*',
        'Host': '<calculated at runtime>',
        'X-Api-Key': 'Zid3HT7e7n0hODsA3+zZwg==SjDYLrqn0IYRUQl2',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch calories burned data from backend: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error retrieving calories burned data:', err);
    throw err;
  }
};

export { searchCaloriesBurned };
