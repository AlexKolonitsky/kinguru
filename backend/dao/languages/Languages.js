'use strict';

module.exports = (sequelize, DataTypes) => {

  const Languages = sequelize.define('Languages', {

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

  }, {
    tableName: 'Languages',
    timestamps: true,
  });

  Languages.associate = models => {

    Languages.belongsToMany(models.Users, {
      as: 'languages',
      through: models.UsersLanguages,
      foreignKey: 'languageId',
    });

  };

  return Languages;
};