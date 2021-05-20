import express from 'express';

import * as usersController from '../controllers/users-controller.js';

const usersRouter = express.Router();

usersRouter.post('/login', (req, res, next) =>
  res.json({ message: 'logged in' })
);

usersRouter.post('/signup', usersController.signup);

export default usersRouter;
