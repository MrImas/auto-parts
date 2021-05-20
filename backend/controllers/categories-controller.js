import { v4 as uuidv4 } from 'uuid';
import HttpError from '../models/http-errors.js';

let DUMMY_CATEGORIES = [
  {
    id: 'c1',
    name: 'category 1',
  },
  {
    id: 'c2',
    name: 'category 2',
  },
  {
    id: 'c3',
    name: 'category 3',
  },
];

export const getCategories = (req, res, next) => {
  res.json({ categories: DUMMY_CATEGORIES });
};

export const createCategory = (req, res, next) => {
  const { name } = req.body;
  const hasCategory = DUMMY_CATEGORIES.find((c) => c.name === name);
  if (hasCategory) {
    return next(
      new HttpError(
        `Category named: ${name} already exists. Please enter a unique name`,
        422
      )
    );
  }
  const createdCategory = {
    id: uuidv4(),
    name,
  };
  DUMMY_CATEGORIES.push(createdCategory);
  res.status(201).json({ product: createdCategory });
};
