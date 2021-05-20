import express from 'express';

const productsRouter = express.Router();

productsRouter.get('/', (req, res, next) =>
  res.json({ message: 'get all products.' })
);

productsRouter.post('/', (req, res, next) =>
  res.json({ message: `create product with props: ${req.body}` })
);

productsRouter.delete('/', (req, res, next) =>
  res.json({ message: 'delete all products.' })
);

productsRouter.get('/:pid', (req, res, next) =>
  res.json({ message: `get product with id: ${req.params.pid}` })
);

productsRouter.patch('/:pid', (req, res, next) =>
  res.json({
    message: `update product with id: ${req.params.pid} and props updated: ${req.body}`,
  })
);

productsRouter.delete('/:pid', (req, res, next) =>
  res.json({ message: `delete product with id: ${req.params.pid}` })
);

export default productsRouter;
