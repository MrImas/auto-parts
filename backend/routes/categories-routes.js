import express from 'express';

import * as categoriesController from '../controllers/categories-controller.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getCategories);

categoriesRouter.post('/', categoriesController.createCategory);

categoriesRouter.delete('/:cid', categoriesController.deleteCategory);

export default categoriesRouter;
