'use strict';

module.exports = (sequelize, DataTypes) => {

  const MeetupsSpeakers = sequelize.define('MeetupsSpeakers', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    meetupId: {
      type: DataTypes.INTEGER,
      references: 'Meetups',
      referencesKey: 'id',
    },
    speakerId: {
      type: DataTypes.INTEGER,
      references: 'Speakers',
      referencesKey: 'id',
    }
  }, {

    tableName: 'MeetupsSpeakers',
    timestamps: true,

  });

  return MeetupsSpeakers;
};