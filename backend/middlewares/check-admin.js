import User from '../models/user.js';
import HttpError from '../models/http-errors.js';

export const checkIsAdmin = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  if (!user) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong',
        403
      )
    );
  }
  if (user.role !== 1) {
    return next(new HttpError('You have no authroization to do that!', 401));
  }
  next();
};
