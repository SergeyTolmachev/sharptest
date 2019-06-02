const Express = require('express');

const router = Express.Router();
const { getToken } = require('../utils/utils');

const User = require('../schemas/User');

router.post('/', async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ _error: 'There is no email' });
    }
    if (!password) {
      return res.status(400).json({ _error: 'There is no password' });
    }
    email = String(email);
    password = String(password);
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(400).json({ _error: 'There is no user with email-password pair' });
    }
    const token = await getToken({ email, id: user.dataValues.id });
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ _error: 'Internal server error' });
  }
});

module.exports = router;
