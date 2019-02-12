'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {

  const Meetups = sequelize.define('Meetups', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },

    speaker: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },

    isFree: {
      type: DataTypes.BOOLEAN,
    },

    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    }

  }, {
    tableName: 'Meetups',
    timestamps: true,
  });

  return Meetups;
};