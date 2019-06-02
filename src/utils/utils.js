const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

module.exports.getToken = async (data) => {
  const token = await jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    ...data,
  }, jwtSecret);
  return token;
};
