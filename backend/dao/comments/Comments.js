'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {

  const Comments = sequelize.define('Comments', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    text: {
      type: DataTypes.TEXT,
    },

    rate: {
      type: DataTypes.INTEGER,
    },

    meetupId: {
      type: DataTypes.INTEGER,
    },

    speakerId: {
      type: DataTypes.INTEGER,
    },

    locationId: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'Comments',
    timestamps: true,
  });

  return Comments;
};
