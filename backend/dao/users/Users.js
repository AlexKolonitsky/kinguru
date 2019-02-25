'use strict';

const _ = require('lodash');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;
const firstIndex = 1;

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('Users', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },

    surname: {
      type: DataTypes.STRING(45),
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

  }, {
    tableName: 'Users',
    timestamps: true,
  });

  Users.beforeCreate((user, options) => {
    return Promise.all([
      utils.encrypt(user.email),
      utils.hashPassword(user.password)
    ])
      .then(result => {
        user.email = result[zeroIndex];
        user.password = result[firstIndex]
      })
  });

  return Users;
};

