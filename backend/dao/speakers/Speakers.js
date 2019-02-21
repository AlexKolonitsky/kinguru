'use strict';

const utils = require('./../../common/securityAssert');

module.exports = (sequelize, DataTypes) => {

  const Speakers = sequelize.define('Speakers', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },

      surname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(100),
      },

      coverSource: {
        type: DataTypes.TEXT,
      },

      key: {
        type: DataTypes.TEXT,
      },
    },

    {
      tableName: 'Speakers',
      timestamps: true,
    });

  Speakers.beforeCreate((speaker, options) => {
    return Promise.all([
      utils.encrypt(speaker.email)
    ])
      .then(result => {
        speaker.email = result
      })
  });

  Speakers.associate = models => {

    Speakers.belongsToMany(models.Meetups, {
      as: 'meetups',
      through: models.MeetupsSpeakers,
      foreignKey: 'speakerId',
    })

  };

  return Speakers


};

