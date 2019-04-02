'use strict';

module.exports = (sequelize, DataTypes) => {

  const Subscriptions = sequelize.define('Subscriptions', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
      },

      updatedAt: {
        type: DataTypes.DATE,
      },
    },

    {
      tableName: 'Subscriptions',
      timestamps: true,
    });

  return Subscriptions
};

