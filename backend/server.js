import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import https from 'https';

import productsRouter from './routes/products-routes.js';
import HttpError from './models/http-errors.js';
import categoriesRouter from './routes/categories-routes.js';
import usersRouter from './routes/users-routes.js';
import paymentRouter from './routes/payment-router.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/users', usersRouter);
app.use('/api/payments', paymentRouter);

app.use((req, res, next) => {
  next(new HttpError('Could not find this route', 404));
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => console.log(err));
  }
  if (res.headersSent) {
    next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An Unknown error has occurred!' });
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(
      path.join(path.resolve(), 'cert', 'localhost-key.pem')
    ),
    cert: fs.readFileSync(path.join(path.resolve(), 'cert', 'localhost.pem')),
  },
  app
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3naae.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(sslServer.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));
