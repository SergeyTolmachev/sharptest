const Sequelize = require('sequelize');
const sequelize = require('../config/postgres');

const User = require('../schemas/User');

const Transaction = sequelize.define('transaction', {
  userId: {
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
  agentId: {
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
  agentName: {
    type: Sequelize.STRING(50),
    validate: {
      is: {
        args: /^[a-z\s]+$/i,
        msg: 'Must be a valid human name',
      },
    },
  },
  type: {
    type: Sequelize.ENUM('debt', 'credit'),
  },
  balance: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: {
        msg: 'Must be a valid integer',
      },
    }
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = Transaction;
