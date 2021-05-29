import express from 'express';

import { fileUpload } from '../middlewares/file-upload.js';
import * as productsController from '../controllers/products-controller.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.post(
  '/',
  fileUpload.single('image'),
  productsController.createProduct
);

productsRouter.get('/:pid', productsController.getProduct);

productsRouter.patch('/:pid', productsController.updateProduct);

productsRouter.delete('/:pid', productsController.deleteProduct);

export default productsRouter;
