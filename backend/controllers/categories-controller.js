import HttpError from '../models/http-errors.js';
import Category from '../models/category.js';

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
    products: [],
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
    .json({ category: createdCategory.toObject({ getters: true }) });
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
  if (categoryToDelete.products.length > 0) {
    return next(
      new HttpError(
        'Could not delete this category. First remove all products from that category.',
        403
      )
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
