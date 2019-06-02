const Express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../config/postgres');

const router = Express.Router();

const isAuth = require('../middlewares/isAuth');

const Transaction = require('../schemas/Transaction');
const User = require('../schemas/User');

router.get('/list', isAuth, async (req, res, next) => {
  try {
    const { id } = req.user;

    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{
          receiverId: id,
        }, {
          senderId: id,
        }],
      },
      order: [['id', 'DESC']],
    });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ _error: 'Internal server error' });
  }
});

router.post('/', isAuth, async (req, res, next) => {
  try {
    const { receiverId, sum } = req.body;
    const { id } = req.user;
    const sender = await User.findOne({ where: { id } });
    const receiver = await User.findOne({ where: { id: receiverId } });
    if (!receiver || !receiverId) {
      return res.status(400).json({ _error: 'There is no receiver in system with the same id' });
    }
    if (Number(sender.dataValues.balance) < Number(sum)) {
      return res.status(400).json({ _error: 'Sum of payment is more balance sum' });
    }
    let transaction;
    const trans = await sequelize.transaction();

    try {
      await User.update({ balance: sender.dataValues.balance - sum }, { where: { id }, transaction: trans });
      await User.update({ balance: receiver.dataValues.balance + sum }, { where: { id: receiverId }, ransaction: trans });
      transaction = await Transaction.create({
        senderId: id,
        receiverId,
        sum,
        senderName: sender.dataValues.name,
        receiverName: receiver.dataValues.name,
      }, { transaction: trans });
      trans.commit();
    } catch (error) {
      trans.rollback();
      return next(error);
    }
    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ _error: 'Internal server error' });
  }
});

module.exports = router;
