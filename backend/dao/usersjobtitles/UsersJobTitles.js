'use strict';

module.exports = (sequelize, DataTypes) => {

  const UsersJobTitles = sequelize.define('UsersJobTitles', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobtitleId: {
      type: DataTypes.INTEGER,
      references: 'JobTitles',
      referencesKey: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    }
  }, {

    tableName: 'UsersJobTitles',
    timestamps: true,

  });

  return UsersJobTitles;
};