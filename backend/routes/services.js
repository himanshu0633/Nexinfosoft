const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const authMiddleware = require('../middleware/auth');

// GET /api/services - Public endpoint to retrieve all services
router.get('/', async (req, res) => {
  try {
    const filter = { slug: { $ne: 'recruitment-services' } };
    if (req.query.all !== 'true') {
      filter.visible = { $ne: false };
    }
    const services = await Service.find(filter).sort({ createdAt: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve services.' });
  }
});

// GET /api/services/:slug - Public endpoint to retrieve a single service
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service || service.slug === 'recruitment-services' || service.visible === false) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve service.' });
  }
});

// POST /api/services - Protected endpoint to add a new service
router.post('/', authMiddleware, async (req, res) => {
  const { slug, title, subtitle, icon, intro, benefits, deliverables, image_url, visible } = req.body;

  if (!slug || !title) {
    return res.status(400).json({ error: 'Service slug and title are required.' });
  }

  try {
    const existing = await Service.findOne({ slug });
    if (existing) {
      return res.status(400).json({ error: 'A service with this slug already exists.' });
    }

    const newService = await Service.create({
      slug,
      title,
      subtitle,
      icon: icon || 'ri-window-line',
      intro,
      benefits: benefits || [],
      deliverables: deliverables || [],
      image_url: image_url || '',
      visible: visible !== undefined ? visible : true
    });

    res.status(201).json({ message: 'Service successfully created', data: newService });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service.' });
  }
});

// PUT /api/services/:id - Protected endpoint to update a service
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { slug, title, subtitle, icon, intro, benefits, deliverables, image_url, visible } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { slug, title, subtitle, icon, intro, benefits, deliverables, image_url, visible },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    res.json({ message: 'Service successfully updated', data: updatedService });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service.' });
  }
});

// DELETE /api/services/:id - Protected endpoint to delete a service
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found to delete.' });
    }

    res.json({ message: 'Service successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service.' });
  }
});

module.exports = router;
