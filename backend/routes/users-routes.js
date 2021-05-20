import express from 'express';

import * as usersController from '../controllers/users-controller.js';

const usersRouter = express.Router();

usersRouter.post('/login', usersController.login);

usersRouter.post('/signup', usersController.signup);

export default usersRouter;
