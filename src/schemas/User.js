const Sequelize = require('sequelize');
const sequelize = require('../config/postgres');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING(50),
    validate: {
      isEmail: {
        msg: 'Must be a valid email',
      }
    },
    unique: true,
  },
  name: {
    type: Sequelize.STRING(50),
    validate: {
      is: {
        args: /^[a-z\s]+$/i,
        msg: 'Must be a valid human name',
      },
    },
  },
  password: {
    type: Sequelize.STRING(50),
    validate: {
      len: {
        args: [4, 50],
        msg: 'Password must be 4 letters at least',
      }
    },
  },
  balance: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: {
        msg: 'Must be a valid integer',
      }
    }
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = User;
