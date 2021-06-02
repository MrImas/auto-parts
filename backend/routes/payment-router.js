import express from 'express';

import * as paymentController from '../controllers/payment-controller.js';
import { checkIsAdmin } from '../middlewares/check-admin.js';
import { checkAuth } from '../middlewares/check-auth.js';

const paymentRouter = express.Router();

paymentRouter.use(checkAuth);

paymentRouter.post('/', paymentController.createPayment);

paymentRouter.use(checkIsAdmin);

paymentRouter.get('/', (req, res, next) => res.json());

paymentRouter.patch('/', (req, res, next) => res.json());

export default paymentRouter;
