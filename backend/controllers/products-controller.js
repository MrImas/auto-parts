import { v4 as uuidv4 } from 'uuid';

import HttpError from '../models/http-errors.js';

let DUMMY_PRODUCTS = [
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
    category: 'category 2',
  },
];

export const getProducts = (req, res, next) => {
  res.json({ products: DUMMY_PRODUCTS });
};

export const createProduct = (req, res, next) => {
  const { title, price, description, content, image, category } = req.body;
  const createdProduct = {
    id: uuidv4(),
    title,
    price,
    description,
    content,
    image,
    category,
  };
  DUMMY_PRODUCTS.push(createdProduct);
  res.status(201).json({ product: createdProduct });
};

export const deleteProducts = (req, res, next) => {
  const productsDeleted = [...DUMMY_PRODUCTS];
  DUMMY_PRODUCTS = [];
  res.json({ products: productsDeleted });
};

export const getProduct = (req, res, next) => {
  const productId = req.params.pid;
  const product = DUMMY_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return next(
      new HttpError(`Could not find any product with id: ${productId}`)
    );
  }
  res.json({ product });
};

export const updateProduct = (req, res, next) => {
  const productId = req.params.pid;
  const propsChanges = req.body;
  const productToUpdate = DUMMY_PRODUCTS.find((p) => p.id === productId);
  const productIndexToUpdate = DUMMY_PRODUCTS.findIndex(
    (p) => p.id === productId
  );
  if (!productToUpdate) {
    return next(
      new HttpError(`Could not find any product with id: ${productId}`)
    );
  }
  const updatedProduct = {
    ...productToUpdate,
    ...propsChanges,
  };
  DUMMY_PRODUCTS[productIndexToUpdate] = updatedProduct;
  res.json({ product: updatedProduct });
};
