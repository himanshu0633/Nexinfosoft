const express = require('express');
const router = express.Router();
const SectionContent = require('../models/SectionContent');
const authMiddleware = require('../middleware/auth');

// GET /api/content/:sectionId - Public endpoint to retrieve section content
router.get('/:sectionId', async (req, res) => {
  const { sectionId } = req.params;

  try {
    const row = await SectionContent.findById(sectionId);
    if (!row) {
      return res.status(404).json({ error: 'Section not found.' });
    }
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve section content.' });
  }
});

// PUT /api/content/:sectionId - Protected endpoint to edit section content
router.put('/:sectionId', authMiddleware, async (req, res) => {
  const { sectionId } = req.params;
  const { title, subtitle, description, image_url, metadata } = req.body;

  // Strict backend constraints validation to protect visual layout integrity
  if (title && title.length > 100) {
    return res.status(400).json({ error: 'Title exceeds the absolute visual limit of 100 characters.' });
  }

  if (subtitle && subtitle.length > 50) {
    return res.status(400).json({ error: 'Subtitle or badge exceeds the visual limit of 50 characters.' });
  }

  if (description && description.length > 400) {
    return res.status(400).json({ error: 'Description text exceeds the visual limit of 400 characters.' });
  }

  // Validate metadata arrays if sent
  if (metadata) {
    let metaObj = metadata;
    if (typeof metadata === 'string') {
      try {
        metaObj = JSON.parse(metadata);
      } catch (e) {
        return res.status(400).json({ error: 'Metadata must be valid JSON format.' });
      }
    }

    // Hero metadata checks
    if (sectionId === 'hero') {
      if (metaObj.rotatingKeywords && Array.isArray(metaObj.rotatingKeywords)) {
        for (const kw of metaObj.rotatingKeywords) {
          if (kw.length > 40) {
            return res.status(400).json({ error: 'Rotating keyword item exceeds visual limit of 40 characters.' });
          }
        }
      }
      if (metaObj.trustPills && Array.isArray(metaObj.trustPills)) {
        for (const pill of metaObj.trustPills) {
          if (pill.length > 35) {
            return res.status(400).json({ error: 'Trust pill label exceeds visual limit of 35 characters.' });
          }
        }
      }
    }

    // Stats metadata checks
    if (sectionId === 'stats') {
      if (metaObj.counters && Array.isArray(metaObj.counters)) {
        for (const item of metaObj.counters) {
          if (item.label && item.label.length > 35) {
            return res.status(400).json({ error: 'Stat counter label exceeds visual limit of 35 characters.' });
          }
          if (item.target && item.target > 10000000) {
            return res.status(400).json({ error: 'Stat target limit exceeded.' });
          }
        }
      }
    }

    // Why Choose Us metadata checks
    if (sectionId === 'whychooseus') {
      if (metaObj.checklist && Array.isArray(metaObj.checklist)) {
        for (const item of metaObj.checklist) {
          if (item.length > 70) {
            return res.status(400).json({ error: 'Checklist item exceeds visual limit of 70 characters.' });
          }
        }
      }
      if (metaObj.metrics && Array.isArray(metaObj.metrics)) {
        for (const metric of metaObj.metrics) {
          if (metric.label && metric.label.length > 35) {
            return res.status(400).json({ error: 'Metric label exceeds visual limit of 35 characters.' });
          }
        }
      }
    }
  }

  try {
    const updated = await SectionContent.findByIdAndUpdate(
      sectionId,
      { title, subtitle, description, image_url, metadata },
      { new: true, upsert: true }
    );

    res.json({ message: 'Content successfully updated', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update section content.' });
  }
});

module.exports = router;
