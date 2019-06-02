const Sequelize = require('sequelize');
const { postgres } = require('./config');

const sequelize = new Sequelize(postgres.database,
  postgres.login,
  postgres.password,
  {
    host: postgres.host,
    dialect: 'postgres',
    port: postgres.port,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 20000,
      idle: 20000,
    },
  });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection is succesfully established');
  })
  .catch((err) => {
    console.log('There is an error with connection : ', err);
  });

sequelize.sync();

module.exports = sequelize;
