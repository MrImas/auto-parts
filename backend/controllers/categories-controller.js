const DUMMY_CATEGORIES = [
  {
    name: 'category 1',
  },
  {
    name: 'category 2',
  },
  {
    name: 'category 3',
  },
];

export const getCategories = (req, res, next) => {
  res.json({ categories: DUMMY_CATEGORIES });
};
