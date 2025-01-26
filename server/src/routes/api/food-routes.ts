import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const EXERCISE_API_BASE_URL = 'https://api.nal.usda.gov/fdc/v1/food/:fdcId?';

router.get('/search', async (req, res) => {
  const {fdcid, api_key, nutrients } = req.query;
  {
    if (!api_key) {
      return res.status(400).json({ message: 'API key is required' });
    }
  }
  if (!fdcid) {
    return res.status(400).json({ message: 'Activity is required' });
  }
  if (!nutrients || isNaN(Number(nutrients))) {
    return res.status(400).json({ message: 'Valid duration is required' });
  }

  try {
    const response = await axios.get(EXERCISE_API_BASE_URL, {
      params: { api_key, nutrients },
      headers: {
        'Accept': '*/*',
        'Host': 'https://api.nal.usda.gov',
        'Content-Type': 'application/json',
      },
    });

    return res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching calories burned data:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({ message: 'Failed to fetch data' });
  }
});

export { router as foodRouter };
