import { Router } from 'express';
import { userRouter } from './nutrition.js';

const router = Router();

router.use('/users', userRouter);

export default router;
