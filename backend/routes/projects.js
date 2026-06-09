const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

const projectDetailsPath = path.join(__dirname, '../scripts/seedProjectDetails.js');
const projectDetails = fs.existsSync(projectDetailsPath) ? require(projectDetailsPath) : {};

const makeSlug = (value = '') => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const normalizeProjectPayload = (body) => ({
  name: body.name,
  slug: makeSlug(body.slug || body.name),
  category: body.category,
  tag: body.tag || body.category?.toUpperCase(),
  techs: body.techs || [],
  desc: body.desc || '',
  icon: body.icon || 'ri-briefcase-4-line',
  image_url: body.image_url || '',
  overview: body.overview || '',
  challenges: body.challenges || [],
  solution: body.solution || '',
  results: body.results || [],
  clientName: body.clientName || '',
  clientRole: body.clientRole || '',
  clientCompany: body.clientCompany || '',
  clientReview: body.clientReview || '',
  clientRating: Number(body.clientRating) || 5,
  showOnHome: body.showOnHome !== undefined ? !!body.showOnHome : false
});

const withProjectDetails = (project) => {
  const data = project.toObject ? project.toObject() : project;
  const fallbackDetails = projectDetails[data.name] || {};

  return {
    ...data,
    ...Object.fromEntries(
      Object.entries(fallbackDetails).filter(([key]) => {
        const value = data[key];
        return value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
      })
    )
  };
};

const persistMissingProjectDetails = async (projects) => {
  const operations = projects.flatMap((project) => {
    const fallbackDetails = projectDetails[project.name];
    if (!fallbackDetails || project.overview) return [];

    return [{
      updateOne: {
        filter: { _id: project._id, $or: [{ overview: { $exists: false } }, { overview: '' }] },
        update: { $set: { ...fallbackDetails, clientRating: 5 } }
      }
    }];
  });

  if (operations.length > 0) {
    await Project.bulkWrite(operations);
  }
};

// GET /api/projects - Public endpoint to retrieve all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    await persistMissingProjectDetails(projects);
    res.json(projects.map(withProjectDetails));
  } catch (err) {
    console.error('Failed to retrieve projects:', err);
    res.status(500).json({ error: 'Failed to retrieve projects.' });
  }
});

// GET /api/projects/:identifier - Public endpoint for a project detail page
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const legacyNamePattern = new RegExp(`^${identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/-/g, '[ -]')}$`, 'i');
    const project = await Project.findOne({
      $or: [
        { slug: identifier.toLowerCase() },
        { name: legacyNamePattern },
        { _id: /^[a-f\d]{24}$/i.test(identifier) ? identifier : null }
      ]
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    await persistMissingProjectDetails([project]);
    res.json(withProjectDetails(project));
  } catch (err) {
    console.error('Failed to retrieve project:', err);
    res.status(500).json({ error: 'Failed to retrieve project.' });
  }
});

// POST /api/projects - Protected endpoint to add a new project
router.post('/', authMiddleware, async (req, res) => {
  const { name, category, overview, challenges, solution, results, clientName, clientReview } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'Project name and category are required.' });
  }
  if (!overview || !challenges?.length || !solution || !results?.length || !clientName || !clientReview) {
    return res.status(400).json({ error: 'Project overview, challenges, solution, results, client name, and client review are required.' });
  }

  try {
    const newProject = await Project.create(normalizeProjectPayload(req.body));

    res.status(201).json({ message: 'Project successfully created', data: newProject });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

// PUT /api/projects/:id - Protected endpoint to update a project
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, category, overview, challenges, solution, results, clientName, clientReview } = req.body;

  if (!name || !category || !overview || !challenges?.length || !solution || !results?.length || !clientName || !clientReview) {
    return res.status(400).json({ error: 'All project detail fields and client review are required.' });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      normalizeProjectPayload(req.body),
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
