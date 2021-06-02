import express from 'express';

import * as usersController from '../controllers/users-controller.js';
import { checkAuth } from '../middlewares/check-auth.js';

const usersRouter = express.Router();

usersRouter.post('/login', usersController.login);

usersRouter.post('/signup', usersController.signup);

usersRouter.use(checkAuth);

usersRouter.get('/cart', usersController.getCart);
usersRouter.patch('/addtocart', usersController.addToCart);
usersRouter.delete('/removefromcart/:pid', usersController.removeFromCart);

export default usersRouter;
