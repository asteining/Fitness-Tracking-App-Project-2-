import express from 'express';
import axios from 'axios';
import type { Request, Response } from 'express';
import { Food } from '../../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const USDA_API_BASE_URL = process.env.USDA_API_BASE_URL;


// GET /food/:id - Get a food by FDC ID
router.get('/:fdcid', async (req: Request, res: Response) => {
  const { fdcid } = req.params; // Use `id` to match the route parameter
  try {
    // Check if food exists in the local database
    const food = await Food.findByPk(fdcid);

    if (!food) {
      // Fetch food details from USDA API
      const apiResponse = await axios.get(`${USDA_API_BASE_URL}/food/${fdcid}`, {
        params: {
          api_key: `fOL9TmHn6ShQscBanrO1tUo7szJWSufyu1VszmXY`, // Use the USDA API key
          nutrients: 208, // Only fetch calories
        },
      });

      if (apiResponse.data) {
        // Extract calories information
        const calories = apiResponse.data.foodNutrients?.find(
          (n: any) => n.nutrientName === 'Energy'
        )?.value || 208;

        // Save to local database
        const newFood = await Food.create({
          fdcid: apiResponse.data.fdcId,
          Nutrients: calories,
        });

        res.json(newFood); // Return the newly saved food
        return;
      }

      res.status(404).json({ message: 'Food not found in USDA API' });
      return;
    }

    // Return food from local database
    res.json(food);
  } catch (error: any) {
    console.error('Error fetching food:', error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE /food/:id - Delete a food by FDC ID
router.delete('/:fdcid', async (req: Request, res: Response) => {
  const { fdcid } = req.params;
  try {
    const food = await Food.findByPk(fdcid);

    if (food) {
      await food.destroy();
      res.json({ message: 'Food deleted' });
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error: any) {
    console.error('Error deleting food:', error);
    res.status(500).json({ message: error.message });
  }
});

export { router as foodRouter };
