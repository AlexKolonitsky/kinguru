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

    description: {
      type: DataTypes.TEXT,
    },

    isOpen: {
      type: DataTypes.BOOLEAN,
    },

    maxGuestsCount: {
      type: DataTypes.INTEGER,
    },

    guestsCount: {
      type: DataTypes.INTEGER,
    },

    cost: {
      type: DataTypes.INTEGER,
    },

    createdAt: {
      type: DataTypes.DATE,
    },

    updatedAt: {
      type: DataTypes.DATE,
    },

    startDate: {
      type: DataTypes.DATE,
    },

    endDate: {
      type: DataTypes.DATE,
    },

    socialLink: {
      type: DataTypes.TEXT,
    },

    coverSource: {
      type: DataTypes.TEXT,
    },

    coverKey: {
      type: DataTypes.TEXT,
    },

    commentsCount: {
      type: DataTypes.TEXT,
    },

    locationId: {
      type: DataTypes.INTEGER,
    }

  }, {
    tableName: 'Meetups',
    timestamps: true,
  });

  Meetups.associate = models => {

    Meetups.belongsToMany(models.Users, {
      as: 'speakers',
      through: models.MeetupsSpeakers,
      foreignKey: 'meetupId',
    });

    Meetups.belongsToMany(models.Users, {
      as: 'guests',
      through: models.MeetupsGuests,
      foreignKey: 'meetupId',
    });

    Meetups.belongsToMany(models.Tags, {
      as: 'tags',
      through: models.MeetupsTags,
      foreignKey: 'meetupId',
    })

  };

  return Meetups;
};