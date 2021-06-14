import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';

import User from '../models/user.js';
import Product from '../models/product.js';
import Payment from '../models/payment.js';
import HttpError from '../models/http-errors.js';

dotenv.config();

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs, please check your data', 422));
  }
  const { name, email, password } = req.body;
  let isUserSignedUp;
  try {
    isUserSignedUp = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  if (isUserSignedUp) {
    return next(
      new HttpError(
        `Email ${email} already exists in the system, please try to log in.`,
        422
      )
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError('Could not sign up user, please try again.', 500)
    );
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError('Could not sign you up, please try again.', 500));
  }

  let token;
  try {
    token = jwt.sign({ userId: newUser.id }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  res.status(201).json({ userId: newUser.id, role: newUser.role, token });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Could not log you in, please try again.', 500));
  }
  if (!existingUser) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong',
        403
      )
    );
  }
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Could not login, please try again', 500));
  }
  if (!isValidPassword) {
    let invalidCredentialsMessage =
      'Could not identify user, credentials seem to be wrong';
    existingUser.numOfAttempts--;
    try {
      invalidCredentialsMessage = `You have ${existingUser.numOfAttempts} more attempts. ${invalidCredentialsMessage}`;
      await existingUser.save();
    } catch (err) {
      return next(new HttpError('Could not login, please try again', 500));
    }

    if (existingUser.numOfAttempts === 0) {
      invalidCredentialsMessage =
        'You failed login in 3 attempts. ' + invalidCredentialsMessage;
    }
    return next(new HttpError(invalidCredentialsMessage, 403));
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
  } catch (err) {
    return next(
      new HttpError('Logging in failed, please try again later.', 500)
    );
  }

  res.json({
    message: 'user logged in',
    userId: existingUser.id,
    userName: existingUser.name,
    role: existingUser.role,
    token,
  });
};

export const changePassword = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new HttpError('Invalid inputs, please check your data', 422));
  // }
  const { password } = req.body;
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError('Changing password failed, please try again.', 500)
    );
  }
  if (!user) {
    return next(
      new HttpError(
        'Could not change password for provided user, please try again',
        404
      )
    );
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError('Could not sign up user, please try again.', 500)
    );
  }
  try {
    user.password = hashedPassword;
    await user.save();
  } catch (err) {
    return next(
      new HttpError('Changing password failed, please try again later.', 500)
    );
  }
  res.json({ message: 'password has changed!' });
};

export const setCart = async (req, res, next) => {
  const { cart } = req.body;
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError('Could not set the cart, please try again.', 500)
    );
  }
  if (!user) {
    return next(
      new HttpError('Could not identify user, please try again', 403)
    );
  }
  const cartUpdated = await Promise.all(
    cart.map(async (productAndQuantityObj) => {
      let product;
      try {
        product = await Product.findById(productAndQuantityObj.productId);
      } catch (err) {
        return next(
          new HttpError('Could not update the cart, please try again', 500)
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
      return { ...productAndQuantityObj };
    })
  );
  user.cart = cartUpdated;
  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError('Could not update the cart, please try again.', 500)
    );
  }
  res.json({ cart: user.cart.map((obj) => obj.toObject({ getters: true })) });
};

export const addToCart = async (req, res, next) => {
  const { pid } = req.body;

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError('Could not add product to cart, please try again.', 500)
    );
  }
  if (!user) {
    return next(
      new HttpError('Could not identify user, please try again', 403)
    );
  }
  let productToAdd;
  try {
    productToAdd = await Product.findById(pid);
  } catch (err) {
    return next(
      new HttpError('Could not add product to cart, please try again.', 500)
    );
  }
  if (!productToAdd) {
    return next(new HttpError('Could not find the chosen product', 404));
  }
  const indexOfProduct = user.cart.map((p) => p.productId).indexOf(pid);
  let quantity;
  try {
    if (indexOfProduct < 0) {
      quantity = 1;
      user.cart.push({ productId: productToAdd.id, quantity });
    } else {
      quantity = user.cart[indexOfProduct].quantity++;
    }
    await user.save();
  } catch (err) {
    return next(
      new HttpError('Could not add product to cart, please try again.', 500)
    );
  }
  res.json({ cart: user.cart.map((obj) => obj.toObject({ getters: true })) });
};

export const removeFromCart = async (req, res, next) => {
  const pid = req.params.pid;
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError('Could not add product to cart, please try again.', 500)
    );
  }
  if (!user) {
    return next(
      new HttpError('Could not identify user, please try again', 403)
    );
  }

  let productToRemoveFromCart;
  try {
    productToRemoveFromCart = await Product.findById(pid);
  } catch (err) {
    return next(
      new HttpError(
        'Could not remove product from cart, please try again.',
        500
      )
    );
  }
  if (!productToRemoveFromCart) {
    return next(new HttpError('Could not find the chosen product', 404));
  }

  const indexOfProduct = user.cart.map((p) => p.productId).indexOf(pid);
  let quantity;
  try {
    if (indexOfProduct > -1) {
      if (user.cart[indexOfProduct].quantity > 1) {
        quantity = user.cart[indexOfProduct].quantity--;
      } else {
        user.cart.pull(user.cart[indexOfProduct]);
        quantity = 0;
      }
      await user.save();
    } else {
      return next(
        new HttpError('The chosen product is not part of the user cart.', 404)
      );
    }
  } catch (err) {
    return next(
      new HttpError(
        'Could not remove product fro, cart, please try again.',
        500
      )
    );
  }
  res.json({ pid, quantity });
};

export const getCart = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    return next(
      new HttpError('Could not find the user info, please try again.', 500)
    );
  }
  if (!user) {
    return next(new HttpError('Could not find the user info', 404));
  }

  res.json({ cart: user.cart.toObject({ getters: true }) });
};

export const getHistoryOfPayments = async (req, res, next) => {
  let historyOfPayments;
  try {
    historyOfPayments = await Payment.find({ userId: req.userData.userId });
  } catch (err) {
    return next(
      new HttpError(
        'Could not find history of payments, please try again.',
        500
      )
    );
  }
  if (!historyOfPayments) {
    return next(new HttpError('There is no history of payments', 404));
  }
  res.json({
    history: historyOfPayments.map((history) =>
      history.toObject({ getters: true })
    ),
  });
};
