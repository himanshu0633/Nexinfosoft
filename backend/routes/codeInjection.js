const express = require('express');
const router = express.Router();
const CodeInjection = require('../models/CodeInjection');
const authMiddleware = require('../middleware/auth');

// GET /api/code-injections - Public endpoint to retrieve all page injections
router.get('/', async (req, res) => {
  try {
    const injections = await CodeInjection.find({});
    res.json(injections);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve code injections.' });
  }
});

// GET /api/code-injections/:page - Protected endpoint to retrieve injection for a specific page
router.get('/:page', authMiddleware, async (req, res) => {
  const { page } = req.params;
  try {
    let injection = await CodeInjection.findOne({ page });
    if (!injection) {
      // Return a blank one if not found
      return res.json({ page, headCode: '', bodyCode: '' });
    }
    res.json(injection);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve page code injection.' });
  }
});

// PUT /api/code-injections/:page - Protected endpoint to update or create page code injection
router.put('/:page', authMiddleware, async (req, res) => {
  const { page } = req.params;
  const { headCode, bodyCode } = req.body;

  try {
    const updated = await CodeInjection.findOneAndUpdate(
      { page },
      { headCode: headCode || '', bodyCode: bodyCode || '' },
      { new: true, upsert: true }
    );
    res.json({ message: 'Code injection saved successfully', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save code injection.' });
  }
});

module.exports = router;
