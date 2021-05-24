import express from 'express';

import * as productsController from '../controllers/products-controller.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.post('/', productsController.createProduct);

productsRouter.get('/:pid', productsController.getProduct);

productsRouter.patch('/:pid', productsController.updateProduct);

productsRouter.delete('/:pid', productsController.deleteProduct);

export default productsRouter;
