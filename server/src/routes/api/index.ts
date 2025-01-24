import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { exerciseRouter } from './exercise-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/exercise', exerciseRouter);


export default router;
