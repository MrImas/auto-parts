import express from 'express';
import { check, body } from 'express-validator';

import * as paymentController from '../controllers/payment-controller.js';
import { checkIsAdmin } from '../middlewares/check-admin.js';
import { checkAuth } from '../middlewares/check-auth.js';

const paymentRouter = express.Router();

paymentRouter.use(checkAuth);

paymentRouter.post(
  '/',
  [
    body('cart').isArray(),
    body('cart.*.productId').notEmpty(),
    body('cart.*.quantity').isInt({ min: 1 }),
  ],
  paymentController.createPayment
);

paymentRouter.use(checkIsAdmin);

paymentRouter.get('/', paymentController.getPayments);

paymentRouter.patch(
  '/:paymentId',
  [check('status').isIn(['Approved', 'Declined'])],
  paymentController.updateStatusOfPayment
);

export default paymentRouter;
