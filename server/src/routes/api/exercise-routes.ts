import express from 'express';
import type { Request, Response } from 'express';
import { Exercise } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const exercises = await Exercise.findAll({
      attributes: { exclude: [' '] }
    });
    res.json(exercises);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users - 
router.post('/', async (req: Request, res: Response) => {
  const { exerciseType, caloriesBurned, hoursPerformed } = req.body;
  try {
    const newExercise = await Exercise.create({ exerciseType, caloriesBurned, hoursPerformed });
    res.status(201).json(newExercise);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /exercise/:id - Update a exercise by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { exerciseType, caloriesBurned, hoursPerformed  } = req.body;
  try {
    const exercise = await Exercise.findByPk(id);
    if (exercise) {
      exercise.exerciseType = exerciseType;
      exercise.caloriesBurned = caloriesBurned;
      exercise.hoursPerformed = hoursPerformed;
      await exercise.save();
      res.json(exercise);
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findByPk(id);
    if (exercise) {
      await exercise.destroy();
      res.json({ message: 'Exercise deleted' });
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as exerciseRouter };
