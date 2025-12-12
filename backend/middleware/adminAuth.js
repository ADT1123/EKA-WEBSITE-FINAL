const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, admin access denied' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'eka-gifts-secret-2025'
    );
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminAuth;
