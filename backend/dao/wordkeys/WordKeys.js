'use strict';

module.exports = (sequelize, DataTypes) => {

  const WordKeys = sequelize.define('WordKeys', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      isExpertise: {
        type: DataTypes.BOOLEAN,
      },

      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },

    },

    {
      tableName: 'WordKeys',
      timestamps: true,
    });

  WordKeys.associate = models => {

    WordKeys.belongsToMany(models.Users, {
      as: 'keywords',
      through: models.UsersKeywords,
      foreignKey: 'wordId',
    });

  };

  return WordKeys;


};

