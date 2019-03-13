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

    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(100),
    },

    birthday: {
      type: DataTypes.DATE,
    },

    locationId: {
      type: DataTypes.INTEGER
    },

    company: {
      type: DataTypes.STRING(100),
    },

    website: {
      type: DataTypes.STRING(100),
    },

    linkedinLink: {
      type: DataTypes.STRING(100),
    },

    facebookLink: {
      type: DataTypes.STRING(100),
    },

    instagramLink: {
      type: DataTypes.STRING(100),
    },

    coverSource: {
      type: DataTypes.TEXT,
    },

    coverKey: {
      type: DataTypes.TEXT,
    },

    createdAt: {
      type: DataTypes.DATE,
    },

    updatedAt: {
      type: DataTypes.DATE,
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

