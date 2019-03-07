'use strict';

const _ = require('lodash');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('Users', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING(100)
    },

    city: {
      type: DataTypes.STRING(100)
    },

    phone: {
      type: DataTypes.STRING(100)
    },

  }, {
    tableName: 'Users',
    timestamps: true,
  });

  Users.beforeCreate((user, options) => {
    return Promise.all([
      utils.hashPassword(user.password)
    ])
      .then(result => {
        user.password = result[zeroIndex]
      })
  });

  return Users;
};

