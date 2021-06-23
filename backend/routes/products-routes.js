import express from 'express';
import { check } from 'express-validator';

import { fileUpload } from '../middlewares/file-upload.js';
import * as productsController from '../controllers/products-controller.js';
import { checkAuth } from '../middlewares/check-auth.js';
import { checkIsAdmin } from '../middlewares/check-admin.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/:pid', productsController.getProduct);

productsRouter.use(checkAuth);
productsRouter.use(checkIsAdmin);

productsRouter.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').notEmpty().isString(),
    check('price').isInt({ min: 1 }),
    check('description').notEmpty().isString(),
    check('content').notEmpty().isString(),
    check('category').notEmpty().isString(),
  ],
  productsController.createProduct
);

productsRouter.patch(
  '/:pid',
  fileUpload.single('image'),
  [
    check('title').notEmpty(),
    check('price').isInt({ min: 1 }),
    check('description').notEmpty().isString(),
    check('content').notEmpty().isString(),
    check('category').notEmpty().isString(),
  ],
  productsController.updateProduct
);

productsRouter.delete('/:pid', productsController.deleteProduct);

export default productsRouter;
