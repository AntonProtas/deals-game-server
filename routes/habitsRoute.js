import { Router } from 'express';
import { validateResource, checkAuthorization } from '../middlewares/index.js';

import habitsGet from '../controllers/habits/habitsGet.js';

const habitsRouter = Router();

habitsRouter.get('/', checkAuthorization, habitsGet);

export { habitsRouter };
