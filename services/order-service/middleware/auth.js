const jwt = require('jsonwebtoken');

module.exports = (...roles) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Unauthorized role' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};