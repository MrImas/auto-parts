import { json } from 'body-parser';
import HttpError from '../models/http-errors.js';
import Payment from '../models/payment.js';
import Product from '../models/product.js';

export const createPayment = async (req, res, next) => {
  const { cart } = req.body;
  cart.map(async (productAndQuantityObj) => {
    let product;
    try {
      product = await Product.findById(productAndQuantityObj.productId);
    } catch (err) {
      return next(
        new HttpError('Could not make the payment, please try again', 500)
      );
    }
    if (!product) {
      return next(
        new HttpError(
          'Could not find one of the products in the cart, please try again',
          404
        )
      );
    }
    if (productAndQuantityObj.quantity < 1) {
      return next(new HttpError('Could not make payment for product', 403));
    }
    return;
  });
  const payment = new Payment({
    userId: req.userData.userId,
    cart,
  });
  try {
    await payment.save();
  } catch (err) {
    return next(
      new HttpError('Could not make the payment, please try again', 500)
    );
  }
  res.status(201).json({ payment: payment.toObject({ getters: true }) });
};
