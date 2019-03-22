'use strict';

module.exports = (sequelize, DataTypes) => {

  const UsersLanguages = sequelize.define('UsersLanguages', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    languageId: {
      type: DataTypes.INTEGER,
      references: 'Languages',
      referencesKey: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    }
  }, {

    tableName: 'UsersLanguages',
    timestamps: true,

  });

  return UsersLanguages;
};