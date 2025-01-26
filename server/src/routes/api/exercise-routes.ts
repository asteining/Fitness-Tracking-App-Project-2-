import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const EXERCISE_API_BASE_URL = 'https://www.api-ninjas.com/api/caloriesburned?';

router.get('/search', async (req, res) => {
  const { activity, duration } = req.query;

  if (!activity) {
    return res.status(400).json({ message: 'Activity is required' });
  }
  if (!duration || isNaN(Number(duration))) {
    return res.status(400).json({ message: 'Valid duration is required' });
  }

  try {
    const response = await axios.get(EXERCISE_API_BASE_URL, {
      params: { duration },
      headers: {
        'Accept': '*/*',
        'Host': 'www.api-ninjas.com',
        'X-Api-Key': 'Zid3HT7e7n0hODsA3+zZwg==SjDYLrqn0IYRUQl2'
      },
    });

    return res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching calories burned data:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({ message: 'Failed to fetch data' });
  }
});

export { router as exerciseRouter };
