const admin = require('./firebase');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
  
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
      } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    } else {
      return res.status(403).json({ error: 'No token provided' });
    }
  };

module.exports = verifyToken;