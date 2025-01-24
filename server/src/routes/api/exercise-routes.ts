import express from 'express';
import axios from 'axios';
import type { Request, Response } from 'express';

const router = express.Router();
const WGER_API_BASE_URL = process.env.EXERCISE_API_BASE_URL || '';
const WGER_API_KEY = process.env.EXERCISE_API_KEY || '';

// GET /api/exercise/search/:query - Search exercises from wger API
router.get('/search/:query', async (req: Request, res: Response) => {
  const { query } = req.params;
  try {
    const response = await axios.get(`${WGER_API_BASE_URL}/exercise`, {
      params: { name: query },
      headers: {
        Authorization: `Token ${WGER_API_KEY}`,
      },
    });

    res.json(response.data.results);
  } catch (error: any) {
    console.error('Error fetching exercises from wger:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Existing routes for local exercises...
export { router as exerciseRouter };
