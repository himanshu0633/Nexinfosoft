const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth');

// Automatically ensure uploads directory exists under the public folder
const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  console.warn('Warning: Could not create uploads directory (read-only filesystem):', err.message);
}

// Multer Disk Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate secure unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'asset-' + uniqueSuffix + ext);
  }
});

// Image file type filtering
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|svg/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only standard image file formats (jpeg, jpg, png, webp, svg) are permitted.'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB file upload
  fileFilter
});

// POST /api/upload - Protected upload endpoint
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please select an image file to upload.' });
  }

  // Generate public-root URL relative path
  const publicUrlPath = `/uploads/${req.file.filename}`;
  res.json({
    message: 'File uploaded successfully',
    imageUrl: publicUrlPath
  });
}, (err, req, res, next) => {
  // Capture uploader error boundary
  res.status(400).json({ error: err.message });
});

module.exports = router;
