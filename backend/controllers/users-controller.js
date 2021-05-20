import { v4 as uuidv4 } from 'uuid';

import HttpError from '../models/http-errors.js';

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Itzik',
    email: 'test@test.com',
    password: 'test',
  },
];
export const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    return next(new HttpError(`Email ${email} already exists.`, 422));
  }
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ user: newUser });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (!hasUser || hasUser.password !== password) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong',
        401
      )
    );
  }
  res.json({ message: 'user logged in' });
};
