const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ include: Product });
    res.status(200).send(tags);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tag = await Tag.findByPk(req.params.id, { include: Product });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const new_tag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    });
    res.status(200).json(new_tag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag_id = req.params.id;
  try {
    const [tag] = await Tag.update(req.body, { where: { id: tag_id } });

if(tag > 0){

  res.status(200).json({message: 'tag has been updated'})
}
else{
  res.status(400).json({message: 'tag has been not been updated'})
}
  
  } catch (err) {
    res.status(500).json(err)
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
