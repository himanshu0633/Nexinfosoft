const express = require('express');
const router = express.Router();
const TechItem = require('../models/TechItem');
const authMiddleware = require('../middleware/auth');

// GET /api/techstack - Public endpoint to retrieve all tech items
router.get('/', async (req, res) => {
  try {
    const techItems = await TechItem.find().sort({ createdAt: 1 });
    res.json(techItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tech stack.' });
  }
});

// POST /api/techstack - Protected endpoint to add a new tech stack item
router.post('/', authMiddleware, async (req, res) => {
  const { category, name, icon, desc, color, metadata } = req.body;

  if (!category || !name) {
    return res.status(400).json({ error: 'Tech category and name are required.' });
  }

  try {
    const newTech = await TechItem.create({
      category,
      name,
      icon: icon || 'ri-code-line',
      desc: desc || '',
      color: color || 'rgba(255,255,255,0.05)',
      metadata: metadata || {}
    });

    res.status(201).json({ message: 'Tech item successfully created', data: newTech });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create tech item.' });
  }
});

// PUT /api/techstack/:id - Protected endpoint to update a tech stack item
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { category, name, icon, desc, color, metadata } = req.body;

  try {
    const updatedTech = await TechItem.findByIdAndUpdate(
      id,
      { category, name, icon, desc, color, metadata },
      { new: true, runValidators: true }
    );

    if (!updatedTech) {
      return res.status(404).json({ error: 'Tech item not found.' });
    }

    res.json({ message: 'Tech item successfully updated', data: updatedTech });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tech item.' });
  }
});

// DELETE /api/techstack/:id - Protected endpoint to delete a tech stack item
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await TechItem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Tech item not found to delete.' });
    }

    res.json({ message: 'Tech item successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tech item.' });
  }
});

module.exports = router;
