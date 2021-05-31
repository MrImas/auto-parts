import express from 'express';

import { fileUpload } from '../middlewares/file-upload.js';
import * as productsController from '../controllers/products-controller.js';
import { checkAuth } from '../middlewares/check-auth.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/:pid', productsController.getProduct);

productsRouter.use(checkAuth);

productsRouter.post(
  '/',
  fileUpload.single('image'),
  productsController.createProduct
);

productsRouter.patch('/:pid', productsController.updateProduct);

productsRouter.delete('/:pid', productsController.deleteProduct);

export default productsRouter;
