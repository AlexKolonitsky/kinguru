'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {

  const Locations = sequelize.define('Locations', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    country: {
      type: DataTypes.TEXT,
    },

    state: {
      type: DataTypes.TEXT,
    },

    city: {
      type: DataTypes.TEXT,
    },

    address: {
      type: DataTypes.TEXT,
    },

    metro: {
      type: DataTypes.TEXT,
    },

    place: {
      type: DataTypes.TEXT,
    },

    zipCode: {
      type: DataTypes.TEXT,
    },

    email: {
      type: DataTypes.TEXT,
    },

    phone: {
      type: DataTypes.TEXT,
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
    tableName: 'Locations',
    timestamps: true,
  });

  return Locations;
};