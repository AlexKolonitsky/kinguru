'use strict';

module.exports = (sequelize, DataTypes) => {

  const Industries = sequelize.define('Industries', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
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
      tableName: 'Industries',
      timestamps: true,
    });

  Industries.associate = models => {

    Industries.belongsToMany(models.Users, {
      as: 'industries',
      through: models.UsersIndustries,
      foreignKey: 'industryId',
    });

  };

  return Industries


};

