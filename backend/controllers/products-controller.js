import { v4 as uuidv4 } from 'uuid';

import Product from '../models/product.js';
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

export const createProduct = async (req, res, next) => {
  const { title, price, description, content, category } = req.body;
  const createdProduct = new Product({
    title,
    price,
    description,
    content,
    image:
      'https://static3.depositphotos.com/1003854/262/i/950/depositphotos_2622850-stock-photo-car-wheel-with-aluminum-rim.jpg',
    category,
  });
  try {
    await createdProduct.save();
  } catch (err) {
    return next(new HttpError('Could not add product, please try again.', 500));
  }
  res.status(201).json({ product: createdProduct.toObject({ getters: true }) });
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

export const updateProduct = async (req, res, next) => {
  const productId = req.params.pid;
  const propsChanges = req.body;
  let productToUpdate;
  try {
    productToUpdate = await Product.findById(productId);
  } catch (err) {
    return next(
      new HttpError('Updating product faild, please try again.', 500)
    );
  }
  if (!productToUpdate) {
    return next(
      new HttpError('Could not find a product with the provided id.', 404)
    );
  }
  for (let prop in propsChanges) {
    productToUpdate[prop] = propsChanges[prop];
  }
  try {
    await productToUpdate.save();
  } catch (err) {
    return next(
      new HttpError('Updating product faild, please try again.', 500)
    );
  }
  res.json({ product: productToUpdate.toObject({ getters: true }) });
};

export const deleteProduct = (req, res, next) => {
  const productId = req.params.pid;
  const productToDelete = DUMMY_PRODUCTS.find((p) => p.id === productId);
  if (!productToDelete) {
    return next(
      new HttpError(`Could not find any product with id: ${productId}`)
    );
  }
  DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter((p) => p.id !== productId);
  res.json({ product: productToDelete });
};
