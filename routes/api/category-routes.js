const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({include: Product});

  res.send(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findOne({
    where: {tag: req.params.id}
  });

  res.send(category);

});

router.post('/', async (req, res) => {
  // create a new category
  const new_Category = await Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })

  res.send(new_Category);

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category_id = req.params.id;

  const category = await Category.update(req.body, { where: {id: category_id}})

  res.json(category);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.findByPk(req.params.id);

  if(!category) {
    return res.status(404).json({error: 'Category not found'});
  };

  await category.destroy();

  res.status(200).json({message: 'Category successfully deleted'})

});

module.exports = router;