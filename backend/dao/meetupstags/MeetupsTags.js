'use strict';

module.exports = (sequelize, DataTypes) => {

  const MeetupsTags = sequelize.define('MeetupsTags', {

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
    tagId: {
      type: DataTypes.INTEGER,
      references: 'Tags',
      referencesKey: 'id',
    }
  }, {

    tableName: 'MeetupsTags',
    timestamps: true,

  });

  return MeetupsTags;
};