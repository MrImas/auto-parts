import express from 'express';
import bodyParser from 'body-parser';

import productsRouter from './routes/products-routes.js';
import HttpError from './models/http-errors.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/products', productsRouter);

app.use((req, res, next) => {
  next(new HttpError('Could not find this route', 404));
});

app.listen(5000, () => console.log('server is listeining on port 5000'));
