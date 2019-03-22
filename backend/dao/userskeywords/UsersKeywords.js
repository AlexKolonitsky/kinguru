'use strict';

module.exports = (sequelize, DataTypes) => {

  const UsersKeywords = sequelize.define('UsersKeywords', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wordId: {
      type: DataTypes.INTEGER,
      references: 'Tags',
      referencesKey: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    }
  }, {

    tableName: 'UsersKeywords',
    timestamps: true,

  });

  return UsersKeywords;
};