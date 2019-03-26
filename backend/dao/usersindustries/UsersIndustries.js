'use strict';

module.exports = (sequelize, DataTypes) => {

  const UsersIndustries = sequelize.define('UsersIndustries', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    industryId: {
      type: DataTypes.INTEGER,
      references: 'Industries',
      referencesKey: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    }
  }, {

    tableName: 'UsersIndustries',
    timestamps: true,

  });

  return UsersIndustries;
};