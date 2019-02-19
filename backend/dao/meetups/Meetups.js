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

    type: {
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
    },

    coverSource: {
      type: DataTypes.TEXT,
    }

  }, {
    tableName: 'Meetups',
    timestamps: true,
  });

  Meetups.associate= models =>{

    Meetups.belongsToMany(models.Speakers, {
      as: 'speakers',
      through: models.MeetupsSpeakers,
      foreignKey: 'meetupId',
    })

  };

  return Meetups;
};