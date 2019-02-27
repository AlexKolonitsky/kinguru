'use strict';

const utils = require('./../../common/securityAssert');

module.exports = (sequelize, DataTypes) => {

  const Tags = sequelize.define('Tags', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(45),
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
      tableName: 'Tags',
      timestamps: true,
    });

  Tags.associate = models => {

    Tags.belongsToMany(models.Meetups, {
      as: 'tags',
      through: models.MeetupsTags,
      foreignKey: 'tagId',
    })

  };

  return Tags


};

