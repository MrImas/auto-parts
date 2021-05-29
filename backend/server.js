import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

import productsRouter from './routes/products-routes.js';
import HttpError from './models/http-errors.js';
import categoriesRouter from './routes/categories-routes.js';
import usersRouter from './routes/users-routes.js';

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

mongoose
  .connect(
    'mongodb+srv://tester:tester123@cluster0.3naae.mongodb.net/autoParts?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(app.listen(5000, () => console.log('Server is listening on port 5000')))
  .catch((err) => console.log(err));
