'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {

  const Images = sequelize.define('Images', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    createdAt: {
      type: DataTypes.DATE,
    },

    updatedAt: {
      type: DataTypes.DATE,
    },

    coverSource: {
      type: DataTypes.TEXT,
    },

    coverKey: {
      type: DataTypes.TEXT,
    },

    locationId: {
      type: DataTypes.INTEGER,
    },

    meetupId: {
      type: DataTypes.INTEGER,
    },

    userId: {
      type: DataTypes.INTEGER,
    },

  }, {
    tableName: 'Images',
    timestamps: true,
  });

  return Images;
};