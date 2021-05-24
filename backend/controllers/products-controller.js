import Product from '../models/product.js';
import HttpError from '../models/http-errors.js';

export const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return next(
      new HttpError('Could not fetch products, please try again', 500)
    );
  }
  res.json({ products: products.map((p) => p.toObject({ getters: true })) });
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

export const getProduct = async (req, res, next) => {
  const productId = req.params.pid;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    return next(
      new HttpError('Could not fetch product with the provided id', 500)
    );
  }
  if (!product) {
    return next(
      new HttpError(`Could not find any product with id: ${productId}`)
    );
  }
  res.json({ product: product.toObject({ getters: true }) });
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

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    return next(
      new HttpError('Could not fetch product with the provided id', 500)
    );
  }
  if (!product) {
    return next(
      new HttpError(`Could not find any product with id: ${productId}`)
    );
  }
  try {
    await product.remove();
  } catch (err) {
    new HttpError('Could not delete product with the provided id', 500);
  }
  res.json({ product: product.toObject({ getters: true }) });
};
