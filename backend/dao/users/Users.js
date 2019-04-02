'use strict';

const _ = require('lodash');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('Users', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(100),
    },

    birthday: {
      type: DataTypes.DATE,
    },

    gender: {
      type: DataTypes.STRING(100),
    },

    locationId: {
      type: DataTypes.INTEGER
    },

    cost: {
      type: DataTypes.INTEGER
    },

    company: {
      type: DataTypes.STRING(100),
    },

    website: {
      type: DataTypes.STRING(100),
    },

    phone: {
      type: DataTypes.STRING(100),
    },

    linkedinLink: {
      type: DataTypes.STRING(100),
    },

    facebookLink: {
      type: DataTypes.STRING(100),
    },

    instagramLink: {
      type: DataTypes.STRING(100),
    },

    coverSource: {
      type: DataTypes.TEXT,
    },

    coverKey: {
      type: DataTypes.TEXT,
    },

    confirmed: {
      type: DataTypes.BOOLEAN,
      default: false,
    },

    role: {                           //user = 1, speaker = 2, admin = 3
      type: DataTypes.INTEGER,
      default: 1,
    },

    faked: {
      type: DataTypes.BOOLEAN,
      default: false,
    },

    createdAt: {
      type: DataTypes.DATE,
    },

    updatedAt: {
      type: DataTypes.DATE,
    },

  }, {
    tableName: 'Users',
    timestamps: true,
  });

  Users.beforeCreate((user, options) => {
    return Promise.all([
      utils.hashPassword(user.password)
    ])
      .then(result => {
        user.password = result[zeroIndex]
      })
  });

  Users.associate = models => {

    Users.belongsToMany(models.Meetups, {
      as: 'speakers',
      through: models.MeetupsSpeakers,
      foreignKey: 'speakerId',
    });

    Users.belongsToMany(models.Meetups, {
      as: 'guests',
      through: models.MeetupsGuests,
      foreignKey: 'guestId',
    });

    Users.belongsToMany(models.Languages, {
      as: 'languages',
      through: models.UsersLanguages,
      foreignKey: 'userId',
    });

    Users.belongsToMany(models.WordKeys, {
      as: 'keywords',
      through: models.UsersKeywords,
      foreignKey: 'userId',
    });

    Users.belongsToMany(models.JobTitles, {
      as: 'jobtitles',
      through: models.UsersJobTitles,
      foreignKey: 'userId',
    });

    Users.belongsToMany(models.Industries, {
      as: 'industries',
      through: models.UsersIndustries,
      foreignKey: 'userId',
    });

    Users.belongsTo(models.Locations, {
      as: 'userLocation',
      foreignKey: 'locationId',
    });
  };


  return Users;
};