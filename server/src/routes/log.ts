import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import Log from '../models/Log';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { exerciseCalories, foodCalories, date } = req.body;
  const log = await Log.create({ ...req.body, userId: req.user.id });
  res.status(201).send(log);
});

router.get('/', authMiddleware, async (req, res) => {
  const logs = await Log.findAll({ where: { userId: req.user.id } });
  res.send(logs);
});

export default router;
