import express from 'express';
import { check, body } from 'express-validator';

import * as usersController from '../controllers/users-controller.js';
import { checkAuth } from '../middlewares/check-auth.js';
import { checkIsSQLInjection } from '../middlewares/check-sql-injection.js';

const usersRouter = express.Router();
usersRouter.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.login
);

usersRouter.post(
  '/signup',
  [
    check('name').isString().notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signup
);

usersRouter.use(checkAuth);

usersRouter.patch(
  '/profile',
  [
    check('email').normalizeEmail().isEmail(),
    check('oldPassword').isLength({ min: 6 }),
    check('password').isLength({ min: 6 }),
  ],
  usersController.changePassword
);
usersRouter.get('/cart', usersController.getCart);
usersRouter.patch(
  '/addtocart',
  [check('pid').isString().notEmpty()],
  usersController.addToCart
);
usersRouter.patch(
  '/setcart',
  [
    body('cart').isArray(),
    body('cart.*.productId').isString().notEmpty(),
    body('cart.*.quantity').isInt({ min: 1 }),
  ],
  usersController.setCart
);
usersRouter.delete('/removefromcart/:pid', usersController.removeFromCart);

usersRouter.get('/history', usersController.getHistoryOfPayments);

export default usersRouter;
