const express = require('express');
const router = express.Router();
const TechCategory = require('../models/TechCategory');
const TechItem = require('../models/TechItem');
const authMiddleware = require('../middleware/auth');

// GET /api/techcategories - Public endpoint to retrieve all categories
router.get('/', async (req, res) => {
  try {
    const categories = await TechCategory.find().sort({ order: 1, createdAt: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve technology categories.' });
  }
});

// POST /api/techcategories - Protected endpoint to add a new category
router.post('/', authMiddleware, async (req, res) => {
  const { key, title, desc, tag, icon, order } = req.body;

  if (!key || !title) {
    return res.status(400).json({ error: 'Category key and title are required.' });
  }

  // key should be sanitized/lowercase
  const categoryKey = key.toLowerCase().trim();

  try {
    // Check if category already exists
    const existing = await TechCategory.findOne({ key: categoryKey });
    if (existing) {
      return res.status(400).json({ error: 'A category with this key already exists.' });
    }

    const newCategory = await TechCategory.create({
      key: categoryKey,
      title,
      desc: desc || '',
      tag: tag || '',
      icon: icon || 'ri-code-s-slash-line',
      order: Number(order) || 0
    });

    res.status(201).json({ message: 'Technology category successfully created', data: newCategory });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create technology category.' });
  }
});

// PUT /api/techcategories/:id - Protected endpoint to update a category
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { key, title, desc, tag, icon, order } = req.body;

  if (key && !title) {
    // Check if we are passing key but missing title
    return res.status(400).json({ error: 'Title is required when updating category.' });
  }

  try {
    const oldCategory = await TechCategory.findById(id);
    if (!oldCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const nextKey = key ? key.toLowerCase().trim() : oldCategory.key;

    // Check key uniqueness if changed
    if (nextKey !== oldCategory.key) {
      const existing = await TechCategory.findOne({ key: nextKey });
      if (existing) {
        return res.status(400).json({ error: 'A category with this key already exists.' });
      }
    }

    const updatedCategory = await TechCategory.findByIdAndUpdate(
      id,
      {
        key: nextKey,
        title,
        desc: desc !== undefined ? desc : oldCategory.desc,
        tag: tag !== undefined ? tag : oldCategory.tag,
        icon: icon !== undefined ? icon : oldCategory.icon,
        order: order !== undefined ? Number(order) : oldCategory.order
      },
      { new: true, runValidators: true }
    );

    // If key changed, also update all associated TechItems
    if (nextKey !== oldCategory.key) {
      await TechItem.updateMany(
        { category: oldCategory.key },
        { category: nextKey }
      );
    }

    res.json({ message: 'Technology category successfully updated', data: updatedCategory });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update technology category.' });
  }
});

// DELETE /api/techcategories/:id - Protected endpoint to delete a category
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const categoryToDelete = await TechCategory.findById(id);
    if (!categoryToDelete) {
      return res.status(404).json({ error: 'Category not found to delete.' });
    }

    // Delete the category
    await TechCategory.findByIdAndDelete(id);

    // Delete associated tech items to maintain referential integrity
    await TechItem.deleteMany({ category: categoryToDelete.key });

    res.json({ message: 'Technology category and associated technology items successfully deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete technology category.' });
  }
});

module.exports = router;
