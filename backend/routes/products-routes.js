import express from 'express';

import * as productsController from '../controllers/products-controller.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.post('/', productsController.createProduct);

productsRouter.delete('/', (req, res, next) =>
  res.json({ message: 'delete all products.' })
);

productsRouter.get('/:pid', (req, res, next) =>
  res.json({ message: `get product with id: ${req.params.pid}` })
);

productsRouter.patch('/:pid', (req, res, next) =>
  res.json({
    message: `update product with id: ${req.params.pid} and props updated: ${req.body}`,
  })
);

productsRouter.delete('/:pid', (req, res, next) =>
  res.json({ message: `delete product with id: ${req.params.pid}` })
);

export default productsRouter;
