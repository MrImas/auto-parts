import express from 'express';

import * as categoriesController from '../controllers/categories-controller.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getCategories);

categoriesRouter.post('/', categoriesController.createCategory);

categoriesRouter.delete('/:cid', (req, res, next) =>
  res.json({ message: `delete categorie with id: ${req.params.cid}` })
);

export default categoriesRouter;
