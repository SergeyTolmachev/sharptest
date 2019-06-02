const Express = require('express');

const router = Express.Router();

const isAuth = require('../middlewares/isAuth');
const User = require('../schemas/User');

router.post('/', isAuth, async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ _error: 'There is no user with email-password pair' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ _error: 'Internal server error' });
  }
});

module.exports = router;
