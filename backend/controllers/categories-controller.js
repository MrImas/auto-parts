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

export const deleteCategory = (req, res, next) => {
  const categoryId = req.params.cid;
  const categoryToDelete = DUMMY_CATEGORIES.find((c) => c.id === categoryId);
  if (!categoryToDelete) {
    return next(
      new HttpError(`Could not find any category with id: ${categoryId}`)
    );
  }
  const hasProductsOfCategoryToDelete = DUMMY_PRODUCTS.find(
    (p) => p.category === categoryToDelete.name
  );
  if (hasProductsOfCategoryToDelete) {
    return next(
      new HttpError(
        `Could not delete category with id: ${categoryId}. You must delete all products of category ${categoryToDelete.name}`,
        401
      )
    );
  }
  DUMMY_CATEGORIES = DUMMY_CATEGORIES.filter((c) => c.id !== categoryId);
  res.json({ category: categoryToDelete });
};
