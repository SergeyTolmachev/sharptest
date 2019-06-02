const Sequelize = require('sequelize');
const sequelize = require('../config/postgres');

const User = require('../schemas/User');

const Transaction = sequelize.define('transaction', {
  senderId: {
    type: Sequelize.INTEGER,
    reference: {
      model: User,
      key: 'id',
    },
    validate: {
      isInt: {
        msg: 'Must be a valid integer',
      },
    },
  },
  receiverId: {
    type: Sequelize.INTEGER,
    reference: {
      model: User,
      key: 'id',
    },
    validate: {
      isInt: {
        msg: 'Must be a valid integer',
      },
    }
  },
  sum: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: {
        msg: 'Must be a valid integer',
      }
    }
  },
  senderName: {
    type: Sequelize.STRING(50),
    validate: {
      is: {
        args: /^[a-z\s]+$/i,
        msg: 'Must be a valid human name',
      },
    },
  },
  receiverName: {
    type: Sequelize.STRING(50),
    validate: {
      is: {
        args: /^[a-z\s]+$/i,
        msg: 'Must be a valid human name',
      },
    },
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = Transaction;
