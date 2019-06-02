const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/config');


module.exports = async (req, res, next) => {
  if (!req || !req.headers || !req.headers.token) {
    return res.status(403).json({ _error: 'Authorization is required' });
  }
  let isRightToken;
  try {
    isRightToken = await jwt.verify(req.headers.token, jwtSecret);
  } catch (error) {
    return res.status(403).json({ _error: 'Token is incorrect' });
  }
  req.user = {
    email: isRightToken.email,
    id: isRightToken.id,
  };
  return next();
};


