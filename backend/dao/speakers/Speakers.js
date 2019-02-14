'use strict';

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
    }
  }, {
    tableName: 'Speakers',
    timestamps: true,
  });

  Speakers.associate= models =>{

    Speakers.belongsToMany(models.Meetups, {
      as: 'meetups',
      through: models.MeetupsSpeakers,
      foreignKey: 'speakerId',
    })

  };

  return Speakers



};
