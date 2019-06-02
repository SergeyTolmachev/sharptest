const Express = require('express');
const { Op } = require('sequelize');

const router = Express.Router();

const isAuth = require('../middlewares/isAuth');
const { getToken } = require('../utils/utils');

const User = require('../schemas/User');

router.get('/', isAuth, async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: ['id', 'email', 'name', 'balance'],
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ _error: 'Internal server error' });
  }
});

router.get('/list', isAuth, async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name || name.length < 3) {
      return res.status(400).json({ _error: 'Name must have a length 3 letters at least' });
    }
    const users = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        },
      },
      order: ['id'],
      limit: 5,
      attributes: ['id', 'name'],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ _error: 'Internal server error' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ _error: 'There is no name' });
    }
    if (!email) {
      return res.status(400).json({ _error: 'There is no email' });
    }
    if (!password) {
      return res.status(400).json({ _error: 'There is no password' });
    }

    try {
      const user = await User.create({
        name, email, password, balance: 500
      });
      const token = await getToken({ email: user.email });
      return res.status(200).json({ user, token });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return res.status(500).json({ _error: 'Internal server error' });
  }
});

module.exports = router;
