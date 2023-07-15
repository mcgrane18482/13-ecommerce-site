const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: [Product] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { include: Product });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const new_Category = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    }); res.status(200).json(new_Category);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category_id = req.params.id;

  try {
    const category = await Category.update(req.body, { where: { id: category_id } })
    res.status(200).json(category);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    // console.log(category);
    if (category === 0) {
      res.status(404).json({ error: 'No category was found with that id' });
      return;
    } else {
      res.status(200).json({ message: 'Category successfully deleted' })

    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;