import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.js';

import HttpError from '../models/http-errors.js';

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Itzik',
    email: 'test@test.com',
    password: 'test',
  },
];
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let isUserSignedUp;
  try {
    isUserSignedUp = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  if (isUserSignedUp) {
    return next(
      new HttpError(
        `Email ${email} already exists in the system, please try to log in.`,
        422
      )
    );
  }
  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError('Could not sign you up, please try again.', 500));
  }
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Could not log you in, please try again.', 500));
  }
  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong',
        401
      )
    );
  }
  res.json({ message: 'user logged in' });
};
