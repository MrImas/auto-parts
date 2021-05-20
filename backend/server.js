import express from 'express';
import bodyParser from 'body-parser';

import productsRouter from './routes/products-routes.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/products', productsRouter);

app.listen(5000, () => console.log('server is listeining on port 5000'));
