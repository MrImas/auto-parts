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

export const getPayments = async (req, res, next) => {
  let payments;
  try {
    payments = await Payment.find();
  } catch (err) {
    return next(
      new HttpError('Could not find all payments, please try again', 500)
    );
  }
  if (!payments) {
    return next(
      new HttpError('There are no found payments, please try again', 404)
    );
  }
  res.json({
    payments: payments.map((payment) => payment.toObject({ getters: true })),
  });
};

export const updateStatusOfPayment = async (req, res, next) => {
  const { status } = req.body;
  const paymentId = req.params.paymentId;

  let payment;
  try {
    payment = await Payment.findById(paymentId);
  } catch (err) {
    return next(
      new HttpError(
        'Could not find the payment for the provided id, please try again',
        500
      )
    );
  }
  if (!payment) {
    return next(
      new HttpError(
        'Did not find payment for the provided id, please try again',
        404
      )
    );
  }

  payment.status = status;
  try {
    await payment.save();
  } catch (err) {
    return next(
      new HttpError(
        'Could not change the status of the payment, please try again',
        500
      )
    );
  }
  res.json({ payment: payment.toObject({ getters: true }) });
};
