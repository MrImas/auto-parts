import express from 'express';

import * as categoriesController from '../controllers/categories-controller.js';
import { checkIsAdmin } from '../middlewares/check-admin.js';
import { checkAuth } from '../middlewares/check-auth.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getCategories);

categoriesRouter.use(checkAuth);
categoriesRouter.use(checkIsAdmin);

categoriesRouter.post('/', categoriesController.createCategory);

categoriesRouter.delete('/:cid', categoriesController.deleteCategory);

export default categoriesRouter;
