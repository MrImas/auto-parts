import * as bcrypt from 'bcrypt';

import User from '../models/user.js';
import HttpError from '../models/http-errors.js';

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError('Could not sign up user, please try again.', 500)
    );
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
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
  if (!existingUser) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong',
        403
      )
    );
  }
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Could not login, please try again', 500));
  }
  if (!isValidPassword) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong',
        403
      )
    );
  }

  res.json({ message: 'user logged in' });
};
