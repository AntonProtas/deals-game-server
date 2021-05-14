import { Router } from 'express';
import { validateResource } from '../middlewares/validateResource.js';
import userCreate, {
  schemaUserCreate
} from '../controllers/user/userCreate.js';
import userAuth, { schemaUserAuth } from '../controllers/user/userAuth.js';

const userRouter = Router();

userRouter.post('/create', validateResource(schemaUserCreate), userCreate);
userRouter.post('/auth', validateResource(schemaUserAuth), userAuth);

export { userRouter };
