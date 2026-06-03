const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'nexinfosoft_jwt_super_secret_key_2026'; // Simple local JWT secret key

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Security authorization token missing.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Access denied. Invalid or expired token.' });
  }
};
