import express from 'express';
import bodyParser from 'body-parser';

import productsRouter from './routes/products-routes.js';
import HttpError from './models/http-errors.js';
import categoriesRouter from './routes/categories-routes.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

app.use((req, res, next) => {
  next(new HttpError('Could not find this route', 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }
  res.status(error.code || 500);
  res.json(error.message || 'An Unknown error has occurred!');
});

app.listen(5000, () => console.log('server is listeining on port 5000'));
