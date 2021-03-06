'use strict';

const Sequelize = require('sequelize');
require('dotenv').config();

const DEFAULT_MYSQL_CONFIG = {
  connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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




