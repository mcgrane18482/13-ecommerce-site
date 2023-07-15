const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: Product
  });
  res.send(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag_id = req.params.id;

  const tag = await Tag.findOne({ include: Product }, { where: { id: tag_id } })

  res.send(tag);

});

router.post('/', async (req, res) => {
  // create a new tag
  const new_tag = await Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  });

  res.send(new_tag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag_id = req.params.id;

  const tag = await Tag.update(req.body, { where: { id: tag_id } })

  res.json(tag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tag = await Tag.findByPk(req.params.id);

  if (!tag) {
    return res.status(404).json({error: 'Tag not found'});
  }

  await tag.destroy();

  res.status(200).json({message:'Tag successfully deleted'});

});

module.exports = router;
