'use strict';

module.exports = (sequelize, DataTypes) => {

  const JobTitles = sequelize.define('JobTitles', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(100),
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
      tableName: 'JobTitles',
      timestamps: true,
    });

  JobTitles.associate = models => {

    JobTitles.belongsToMany(models.Users, {
      as: 'jobtitles',
      through: models.UsersJobTitles,
      foreignKey: 'jobtitleId',
    });

  };

  return JobTitles


};

