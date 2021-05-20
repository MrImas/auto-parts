import express from 'express';

import * as productsController from '../controllers/products-controller.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.post('/', productsController.createProduct);

productsRouter.delete('/', productsController.deleteProducts);

productsRouter.get('/:pid', productsController.getProduct);

productsRouter.patch('/:pid', productsController.updateProduct);

productsRouter.delete('/:pid', (req, res, next) =>
  res.json({ message: `delete product with id: ${req.params.pid}` })
);

export default productsRouter;
