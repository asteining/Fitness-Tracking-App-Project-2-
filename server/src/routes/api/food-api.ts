import express from 'express';
import type { Request, Response } from 'express';
import { Food } from '../../models/index.js';

const router = express.Router();


// GET /food/:id - Get a food by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /food - Create a new food
router.post('/', async (req: Request, res: Response) => {
  const { Servings, Calories } = req.body;
  try {
    const newFood = await Food.create({ Servings, Calories });
    res.status(201).json(newFood);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /users/:id - Update a food by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Calories, Servings } = req.body;
  try {
    const food = await Food.findByPk(id);
    if (food) {
      food.Servings = Servings;
      food.Calories = Calories;
      await food.save();
      res.json(Food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /food/:id - Delete a food by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id); // Corrected to use Food model
    if (food) {
      await food.destroy();
      res.json({ message: 'Food deleted' });
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
export { router as foodRouter };
