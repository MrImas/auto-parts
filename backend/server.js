import express from 'express';
import bodyParser from 'body-parser';

import productsRouter from './routes/products-routes.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/products', productsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Could not find this route' });
});

app.listen(5000, () => console.log('server is listeining on port 5000'));
