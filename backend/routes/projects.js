const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

// GET /api/projects - Public endpoint to retrieve all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve projects.' });
  }
});

// POST /api/projects - Protected endpoint to add a new project
router.post('/', authMiddleware, async (req, res) => {
  const { name, category, tag, techs, desc, icon, image_url } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'Project name and category are required.' });
  }

  try {
    const newProject = await Project.create({
      name,
      category,
      tag: tag || category.toUpperCase(),
      techs: techs || [],
      desc: desc || '',
      icon: icon || 'ri-briefcase-4-line',
      image_url: image_url || ''
    });

    res.status(201).json({ message: 'Project successfully created', data: newProject });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

// PUT /api/projects/:id - Protected endpoint to update a project
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, category, tag, techs, desc, icon, image_url } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, category, tag, techs, desc, icon, image_url },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json({ message: 'Project successfully updated', data: updatedProject });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

// DELETE /api/projects/:id - Protected endpoint to delete a project
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found to delete.' });
    }

    res.json({ message: 'Project successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

module.exports = router;
