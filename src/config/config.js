require('dotenv').config();

module.exports = {
  appPort: process.env.APPLICATION_PORT || 3000,
  postgres: {
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    login: process.env.POSTGRES_LOGIN,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  },
  jwtSecret: process.env.JWT_SECRET,
};
