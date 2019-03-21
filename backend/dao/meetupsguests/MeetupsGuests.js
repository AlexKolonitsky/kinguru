'use strict';

module.exports = (sequelize, DataTypes) => {

  const MeetupsGuests = sequelize.define('MeetupsGuests', {

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
    guestId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    }
  }, {

    tableName: 'MeetupsGuests',
    timestamps: true,

  });

  return MeetupsGuests;
};