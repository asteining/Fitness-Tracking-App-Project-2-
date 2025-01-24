import express from 'express';
import axios from 'axios';

const router = express.Router();

const EXERCISE_API_BASE_URL = 'https://api.api-ninjas.com/v1/caloriesburned?';
const X_API_KEY = 'Zid3HT7e7n0hODsA3+zZwg==SjDYLrqn0IYRUQl2';

router.get('/search', async (req, res) => {
  const { activity, duration } = req.query;

  try {
    const response = await axios.get(EXERCISE_API_BASE_URL, {
      params: { activity, duration },
      headers: {
        'X-Api-Key': X_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching calories burned data:', error.message);
    res.status(error.response?.status || 500).json({ message: 'Failed to fetch data' });
  }
});

export { router as exerciseRouter };
