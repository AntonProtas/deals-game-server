import { Router } from 'express';
import {
  validateResource,
  checkAuthorization,
  validateImage
} from '../middlewares/index.js';

import habitCreate, {
  schemaHabitCreate
} from '../controllers/habit/habitCreate.js';

import habitUpdate, {
  schemaHabitUpdate
} from '../controllers/habit/habitUpdate.js';

import habitDelete from '../controllers/habit/habitDelete.js';

const habitRouter = Router();

habitRouter.post(
  '/',
  checkAuthorization,
  validateResource(schemaHabitCreate),
  validateImage,
  habitCreate
);

habitRouter.delete('/:id', checkAuthorization, habitDelete);

habitRouter.put(
  '/:id',
  checkAuthorization,
  validateResource(schemaHabitUpdate),
  habitUpdate
);

export { habitRouter };
