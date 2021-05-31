import jwt from 'jsonwebtoken';

import HttpError from '../models/http-errors.js';

export const checkAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // 'Bearer <TOKEN>'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedData = jwt.verify(token, 'private_secret_dont_share');
    req.userData = { userId: decodedData.userId };
    next();
  } catch (err) {
    return next(new HttpError('Authentication failed!', 403));
  }
};
