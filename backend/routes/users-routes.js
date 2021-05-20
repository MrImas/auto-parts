import express from 'express';

const usersRouter = express.Router();

usersRouter.post('/login', (req, res, next) =>
  res.json({ message: 'logged in' })
);

usersRouter.post('/signup', (req, res, next) =>
  res.json({ message: 'signed up' })
);

export default usersRouter;
