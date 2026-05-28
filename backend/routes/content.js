const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

// GET /api/content/:sectionId - Public endpoint to retrieve section content
router.get('/:sectionId', (req, res) => {
  const { sectionId } = req.params;

  db.get("SELECT * FROM section_content WHERE id = ?", [sectionId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve section content.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Section not found.' });
    }

    // Parse metadata back to JSON object if it exists
    if (row.metadata) {
      try {
        row.metadata = JSON.parse(row.metadata);
      } catch (parseErr) {
        // Keep as string if parsing fails
      }
    }
    res.json(row);
  });
});

// PUT /api/content/:sectionId - Protected endpoint to edit section content
router.put('/:sectionId', authMiddleware, (req, res) => {
  const { sectionId } = req.params;
  const { title, subtitle, description, image_url, metadata } = req.body;

  // Strict backend constraints validation to protect visual layout integrity
  if (title && title.length > 70) {
    return res.status(400).json({ error: 'Title exceeds the absolute visual limit of 70 characters.' });
  }

  if (subtitle && subtitle.length > 40) {
    return res.status(400).json({ error: 'Subtitle or badge exceeds the visual limit of 40 characters.' });
  }

  if (description && description.length > 250) {
    return res.status(400).json({ error: 'Description text exceeds the visual limit of 250 characters.' });
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
          if (kw.length > 30) {
            return res.status(400).json({ error: 'Rotating keyword item exceeds visual limit of 30 characters.' });
          }
        }
      }
      if (metaObj.trustPills && Array.isArray(metaObj.trustPills)) {
        for (const pill of metaObj.trustPills) {
          if (pill.length > 25) {
            return res.status(400).json({ error: 'Trust pill label exceeds visual limit of 25 characters.' });
          }
        }
      }
    }

    // Stats metadata checks
    if (sectionId === 'stats') {
      if (metaObj.counters && Array.isArray(metaObj.counters)) {
        for (const item of metaObj.counters) {
          if (item.label && item.label.length > 25) {
            return res.status(400).json({ error: 'Stat counter label exceeds visual limit of 25 characters.' });
          }
          if (item.target && item.target > 1000000) {
            return res.status(400).json({ error: 'Stat target limit exceeded.' });
          }
        }
      }
    }

    // Why Choose Us metadata checks
    if (sectionId === 'whychooseus') {
      if (metaObj.checklist && Array.isArray(metaObj.checklist)) {
        for (const item of metaObj.checklist) {
          if (item.length > 50) {
            return res.status(400).json({ error: 'Checklist item exceeds visual limit of 50 characters.' });
          }
        }
      }
      if (metaObj.metrics && Array.isArray(metaObj.metrics)) {
        for (const metric of metaObj.metrics) {
          if (metric.label && metric.label.length > 25) {
            return res.status(400).json({ error: 'Metric label exceeds visual limit of 25 characters.' });
          }
        }
      }
    }
  }

  // Convert metadata back to JSON string for DB storage if it's an object
  const metadataStr = metadata ? (typeof metadata === 'object' ? JSON.stringify(metadata) : metadata) : null;

  db.run(
    `UPDATE section_content 
     SET title = ?, subtitle = ?, description = ?, image_url = ?, metadata = ? 
     WHERE id = ?`,
    [title, subtitle, description, image_url, metadataStr, sectionId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update section content.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Section not found to update.' });
      }

      res.json({ message: 'Content successfully updated' });
    }
  );
});

module.exports = router;
