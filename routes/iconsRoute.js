import { Router } from 'express';

import iconsGet from '../controllers/icons/iconsGet.js';

const iconsRouter = Router();

iconsRouter.get('/', iconsGet);

export { iconsRouter };
