import { Router } from 'express';
import { userRouter } from './userRoute.js';
import { habitRouter } from './habitRoute.js';
import { habitsRouter } from './habitsRoute.js';
import { iconsRouter } from './iconsRoute.js';

const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/habit', habitRouter);
rootRouter.use('/habits', habitsRouter);
rootRouter.use('/icons', iconsRouter);

export default rootRouter;
