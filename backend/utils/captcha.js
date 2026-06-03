const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'nexinfosoft_jwt_super_secret_key_2026';

/**
 * Generates a random alphanumeric captcha, creates an SVG representation of it,
 * and signs a secure JWT token containing the uppercase value.
 * @returns {Object} { captchaSvg: string, captchaKey: string }
 */
const createCaptcha = () => {
  // Exclude ambiguous characters (like 0, O, 1, I) to ensure user-friendly experience
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let text = '';
  for (let i = 0; i < 6; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const width = 180;
  const height = 50;

  // Modern SVG with dark glassmorphic accent styling
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background: rgba(15, 23, 42, 0.05); border-radius: 12px; border: 1px solid rgba(15, 23, 42, 0.08); display: block;">`;

  // 1. Draw subtle background lines (noise)
  for (let i = 0; i < 5; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(15, 23, 42, 0.12)" stroke-width="${1 + Math.random() * 1.5}"/>`;
  }

  // Neon-ish vibrant colors fitting the premium theme
  const colors = ['#0d9488', '#0f766e', '#4f46e5', '#4338ca', '#7c3aed', '#6d28d9', '#db2777'];

  // 2. Draw alphanumeric characters with randomized styles
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // Spread evenly across the width with slight random offset
    const x = 16 + i * 26 + (Math.random() - 0.5) * 6;
    const y = 34 + (Math.random() - 0.5) * 6;
    const rotate = (Math.random() - 0.5) * 36; // rotate up to +/- 18 degrees
    const color = colors[Math.floor(Math.random() * colors.length)];
    const fontSize = 24 + Math.floor(Math.random() * 5); // 24px to 28px

    svg += `<text x="${x}" y="${y}" transform="rotate(${rotate} ${x} ${y})" fill="${color}" font-family="monospace, sans-serif" font-weight="900" font-size="${fontSize}px" style="user-select: none; letter-spacing: 2px;">${char}</text>`;
  }

  // 3. Draw noise dots (circles)
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = Math.random() * 1.2 + 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.25" />`;
  }

  svg += '</svg>';

  // Sign a stateless secure JWT key valid for 5 minutes
  const captchaKey = jwt.sign({ code: text.toUpperCase() }, JWT_SECRET, { expiresIn: '5m' });

  return {
    captchaSvg: svg,
    captchaKey
  };
};

/**
 * Verifies if the provided captcha value matches the signed token.
 * @param {string} captchaKey Signed JWT token containing the actual value
 * @param {string} captchaValue User input to verify
 * @returns {boolean} True if matched and verified, False otherwise
 */
const verifyCaptchaValue = (captchaKey, captchaValue) => {
  if (!captchaKey || !captchaValue) return false;

  try {
    const decoded = jwt.verify(captchaKey, JWT_SECRET);
    return decoded.code === captchaValue.trim().toUpperCase();
  } catch (err) {
    // JWT expired or was tampered with
    return false;
  }
};

module.exports = {
  createCaptcha,
  verifyCaptchaValue
};
