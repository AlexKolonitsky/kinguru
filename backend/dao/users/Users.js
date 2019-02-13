'use strict';

const _ = require('lodash');

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
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
  });

  return Users;
};

