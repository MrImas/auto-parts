import express from 'express';

const categoriesRouter = express.Router();

categoriesRouter.get('/', (req, res, next) =>
  res.json({ message: 'get all categories' })
);

categoriesRouter.post('/', (req, res, next) =>
  res.json({ message: 'create categorie' })
);

categoriesRouter.delete('/:cid', (req, res, next) =>
  res.json({ message: `delete categorie with id: ${req.params.cid}` })
);

export default categoriesRouter;
