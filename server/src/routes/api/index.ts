import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { exerciseRouter } from './exercise-routes.js';
import { foodRouter } from './food-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/exercise', exerciseRouter);
router.use('/food', foodRouter);

export default router;
