import { v4 as uuidv4 } from 'uuid';

import HttpError from '../models/http-errors.js';
import Category from '../models/category.js';

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

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'Wheel',
    price: 10,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod`,
    image:
      'https://static3.depositphotos.com/1003854/262/i/950/depositphotos_2622850-stock-photo-car-wheel-with-aluminum-rim.jpg',
    category: 'category 1',
  },
  {
    id: 'p2',
    title: 'Car Battery',
    price: 35,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod`,
    image:
      'https://media.tractorsupply.com/is/image/TractorSupplyCompany/1323449?$456$',
    category: 'category 1',
  },
];

export const getCategories = async (req, res, next) => {
  let categories;
  try {
    categories = await Category.find();
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again.', 500));
  }
  if (!categories || categories.length === 0) {
    return next(new HttpError('There are no categories found', 404));
  }
  res.json({
    categories: categories.map((c) => c.toObject({ getters: true })),
  });
};

export const createCategory = async (req, res, next) => {
  const { name } = req.body;
  let hasCategory;
  try {
    hasCategory = await Category.findOne({ name });
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again.', 500));
  }
  if (hasCategory) {
    return next(
      new HttpError(
        'Category already exists, add only unique names of categories',
        422
      )
    );
  }
  const createdCategory = new Category({
    name,
  });
  try {
    await createdCategory.save();
  } catch (err) {
    return next(
      new HttpError('Could not create category, please try again.', 500)
    );
  }
  res
    .status(201)
    .json({ product: createdCategory.toObject({ getters: true }) });
};

export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.cid;
  let categoryToDelete;
  try {
    categoryToDelete = await Category.findById(categoryId);
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again.', 500));
  }
  if (!categoryToDelete) {
    return next(
      new HttpError('Category with the provided name was not found', 404)
    );
  }
  try {
    await categoryToDelete.remove();
  } catch (err) {
    return next(
      new HttpError('Could not delete category, please try again.', 500)
    );
  }
  res.json({ category: categoryToDelete.toObject({ getters: true }) });
};
