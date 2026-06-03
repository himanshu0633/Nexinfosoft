const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const authMiddleware = require('../middleware/auth');
const { createCaptcha, verifyCaptchaValue } = require('../utils/captcha');

// GET /api/contact/captcha - Public endpoint to retrieve a new visual captcha
router.get('/captcha', (req, res) => {
  try {
    const { captchaSvg, captchaKey } = createCaptcha();
    res.json({ captchaSvg, captchaKey });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate captcha.' });
  }
});

// POST /api/contact - Public endpoint to submit a contact/consultation form
router.post('/', async (req, res) => {
  const { fullName, companyName, email, phone, service, budget, details, captchaKey, captchaValue } = req.body;

  if (!fullName || !email || !phone || !service || !budget || !details) {
    return res.status(400).json({ error: 'All fields marked with * are required.' });
  }

  // Captcha validation
  if (!captchaKey || !captchaValue) {
    return res.status(400).json({ error: 'Security captcha verification is required.' });
  }

  const isCaptchaValid = verifyCaptchaValue(captchaKey, captchaValue);
  if (!isCaptchaValid) {
    return res.status(400).json({ error: 'Incorrect security captcha. Please try again.' });
  }

  try {
    const submission = await ContactSubmission.create({
      fullName,
      companyName: companyName || '',
      email,
      phone,
      service,
      budget,
      details
    });

    res.status(201).json({ message: 'Inquiry successfully submitted!', data: submission });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit inquiry.' });
  }
});

// GET /api/contact - Protected endpoint to retrieve all inquiries (sorted latest first)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve inquiries.' });
  }
});

// DELETE /api/contact/:id - Protected endpoint to delete a contact submission
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ContactSubmission.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Submission not found to delete.' });
    }

    res.json({ message: 'Inquiry successfully deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

// PUT /api/contact/:id/status - Protected endpoint to update a lead's status
router.put('/:id/status', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'in-discussion', 'converted', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const updated = await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Submission not found to update.' });
    }

    res.json({ message: 'Status successfully updated!', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status.' });
  }
});

module.exports = router;
