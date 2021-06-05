import mongoose from 'mongoose';
import fs from 'fs';
import { validationResult } from 'express-validator';

import Product from '../models/product.js';
import HttpError from '../models/http-errors.js';
import Category from '../models/category.js';

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs, please check your data', 422));
  }
  const { title, price, description, content, category } = req.body;
  const createdProduct = new Product({
    title,
    price,
    description,
    content,
    image: req.file.path,
    category,
  });
  let categoryOfProduct;
  try {
    categoryOfProduct = await Category.findById(category);
  } catch (err) {
    return next(new HttpError('Could not add product, please try again.', 500));
  }
  if (!categoryOfProduct) {
    return next(
      new HttpError(`Could not find any category with the provided  id.`, 404)
    );
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    categoryOfProduct.products.push(createdProduct);
    await categoryOfProduct.save();
    await sess.commitTransaction();
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
      new HttpError(`Could not find any product with id: ${productId}`),
      404
    );
  }
  res.json({ product: product.toObject({ getters: true }) });
};

export const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs, please check your data', 422));
  }
  const productId = req.params.pid;
  const propsChanges = req.body;
  let productToUpdate;
  try {
    productToUpdate = await Product.findById(productId).populate('category');
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
  if (req.file && req.file.path) {
    productToUpdate.image = req.file.path;
  }
  for (let prop in propsChanges) {
    if (prop !== 'category') {
      productToUpdate[prop] = propsChanges[prop];
    }
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    if ('category' in propsChanges) {
      productToUpdate.category.products.pull(productToUpdate);
      await productToUpdate.category.save();
      const newCategory = await Category.findById(propsChanges['category']);
      newCategory.products.push(productToUpdate);
      await newCategory.save();
      productToUpdate.category = newCategory;
    }
    await productToUpdate.save();
    sess.commitTransaction();
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
    product = await Product.findById(productId).populate('category');
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
  const imagePath = product.image;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    product.category.products.pull(product);
    await product.category.save({ session: sess });
    await product.remove({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    new HttpError('Could not delete product with the provided id', 500);
  }
  fs.unlink(imagePath, (err) => console.log(err));
  res.json({ product: product.toObject({ getters: true }) });
};
