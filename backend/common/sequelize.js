'use strict';

const Sequelize = require('sequelize');

const DEFAULT_MYSQL_CONFIG = {
  connectionLimit: 100,
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'Kinguru',
};

const sequelize = new Sequelize(
  DEFAULT_MYSQL_CONFIG.database,
  DEFAULT_MYSQL_CONFIG.user,
  DEFAULT_MYSQL_CONFIG.password,
  {
    host: DEFAULT_MYSQL_CONFIG.host,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: DEFAULT_MYSQL_CONFIG.connectionLimit,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;




