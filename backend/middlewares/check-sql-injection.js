import fs from 'fs';
import path from 'path';

import HttpError from '../models/http-errors.js';

export const checkIsSQLInjection = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  const { ...body } = req.body;
  if (!body) {
    next();
  }
  const data = fs.readFileSync(
    path.resolve('../backend/SQLInjection/sql-dict.txt'),
    'utf-8'
  );
  const linesOfSQLInjections = data.split('\n');
  for (const prop in body) {
    if (linesOfSQLInjections.includes(prop)) {
      return next(new HttpError('Invalid input, please try again.', 500));
    }
  }
  next();
};
