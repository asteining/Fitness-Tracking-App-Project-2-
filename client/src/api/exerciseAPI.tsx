const retrieveLocalExercises = async () => {
  try {
    const response = await fetch('/api/exercise', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch local exercises. Check the network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error retrieving local exercises:', err);
    return [];
  }
};

const searchWgerExercises = async (query: string) => {
  try {
    const response = await fetch(
      `https://wger.de/api/v2/exercise/?name=${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${process.env.EXERCISE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exercises from wger API');
    }

    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error('Error retrieving wger exercises:', err);
    return [];
  }
};

export { retrieveLocalExercises, searchWgerExercises };
