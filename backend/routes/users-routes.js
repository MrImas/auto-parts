import express from 'express';
import { check } from 'express-validator';

import * as usersController from '../controllers/users-controller.js';
import { checkAuth } from '../middlewares/check-auth.js';

const usersRouter = express.Router();

usersRouter.post('/login', usersController.login);

usersRouter.post(
  '/signup',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signup
);

usersRouter.use(checkAuth);

usersRouter.patch('/profile', usersController.changePassword);
usersRouter.get('/cart', usersController.getCart);
usersRouter.patch('/addtocart', usersController.addToCart);
usersRouter.patch('/setcart', usersController.setCart);
usersRouter.delete('/removefromcart/:pid', usersController.removeFromCart);

usersRouter.get('/history', usersController.getHistoryOfPayments);

export default usersRouter;
