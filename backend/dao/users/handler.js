'use strict';

/**
 * @typedef {Object} PublicUser
 * @property {string} username
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} coins
 * @property {string} language
 * @property {number} id
 */

const _ = require('lodash');
const ERRORS_CODE = require('./../../common/securityAssert').ERRORS_CODE;
const utils = require('./../../common/securityAssert');
const nodemailer = require('./../../common/nodemailer');
const Sequelize = require('sequelize');

const {Users, Locations, Languages, UsersLanguages, WordKeys, UsersKeywords, JobTitles, UsersJobTitles, Industries, UsersIndustries} = require('./../index');
const defaultUserAttributes = [
  'id', 'firstname', 'lastname', 'email', 'description', 'birthday', 'gender', 'phone',
  'locationId', 'cost', 'company', 'website', 'linkedinLink', 'facebookLink', 'instagramLink',
  'coverSource', 'coverKey', 'createdAt', 'updatedAt', 'confirmed', 'role', 'faked'
];

const userAssociates = [
  {
    model: Languages, as: 'languages', attributes: ['id', 'name'],
    through: {attributes: []}
  },
  {
    model: WordKeys, as: 'keywords', attributes: ['id', 'name', 'isExpertise'],
    through: {attributes: []}
  },
  {
    model: JobTitles, as: 'jobtitles', attributes: ['id', 'name'],
    through: {attributes: []}
  },
  {
    model: Industries, as: 'industries', attributes: ['id', 'name'],
    through: {attributes: []}
  },];

class UsersDao {

  getUserObject(userInfo) {
    return {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      password: userInfo.password,
      phone: userInfo.phone,
      faked: userInfo.faked,
      role: userInfo.role,
      coverSource: userInfo.coverSource,
      coverKey: userInfo.coverKey
    }
  }

  createUser(userInfo, link) {
    const email = userInfo.email;
    return Users.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (!user) {
          return nodemailer.sendMail(
            null,
            email,
            'KINGURU user confirmation',
            `Hello, ${{email}}! Thank you for registering! To set up your account and start an event, confirm your email address, please, and click the button below.`,
            `<a href="${link}?email=${utils.getJwtToken(email).split(' ')[1]}">Registration confirmation</a>`,
          ).then(() => {
            return Users.create(this.getUserObject(userInfo));
          })
            .catch(sendError => {
              return Promise.reject(sendError)
            });
        }
        return Promise.reject({code: ERRORS_CODE.DUPLICATE});
      });
  }

  createSpeaker(userInfo) {
    userInfo.faked = true;
    userInfo.role = 2;
    userInfo.password = '1234qweasdzxc';
    return Users.findOne({
      where: {
        email: userInfo.email
      }
    })
      .then(user => {
        if (!user) {
          return Users.create(this.getUserObject(userInfo))
            .then(user => {
              return this.getUserById(user.id)
            })
        }
        return {code: ERRORS_CODE.DUPLICATE};
      })
  }

  calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getUsersByAge(users, from, to) {
    return users
      .filter(speaker => {
        const age = this.calculateAge(speaker.birthday);
        return ((from || -1) <= age) && (age <= (to || 999));
      })
  }

  getSpeakersByAssociations(roles = [1,2,3], associationTable) {
    const filter = {role: roles};
    if (associationTable) {
      filter.id = _.uniq(_.map(associationTable, 'userId'));
    }
    console.log(roles);
    return Users.findAll({
      where: filter,
      attributes: defaultUserAttributes
    })
  };

  getUsersByAssociated(model, ids = [], filter, roles) {
    if (!ids.length) {
      return this.getSpeakersByAssociations(roles);
    }
    return model.findAll({
      where: filter,
    })
      .then(response => {
        return this.getSpeakersByAssociations(roles, response);
      })
  }

  getUsersByCity(users, city) {
    if (!city) {
      return users;
    }
    const locationPromises = [];
    users.forEach(user => locationPromises.push(
      Locations.findOne({
        where: {
          id: user.locationId,
          city: city
        }
      })
      )
    );
    return Promise.all(locationPromises)
      .then(locations => {
        return users.filter((user, index) => {
          if (locations[index]) {
            return user;
          }
        })
      })
  }

  getSpeakers(filter = {}) {
    const queryFilter = {
      cost: {
        [Sequelize.Op.between]: [filter.costFrom || -1, filter.costTo || 999999999]
      },
      role: 2
    };
    if (filter.gender) {
      queryFilter.gender = filter.gender;
    }
    return Users.findAll({
      where: queryFilter,
      include: userAssociates,
      attributes: defaultUserAttributes
    })
      .then(speakers => {
        const speakerRole = [2];
        return Promise.all([
          this.getUsersByAssociated(UsersLanguages, filter.languages, {languageId: filter.languages}, speakerRole),
          this.getUsersByAssociated(UsersKeywords, filter.expertises, {wordId: filter.expertises}, speakerRole),
          this.getUsersByAssociated(UsersJobTitles, filter.jobTitles, {jobtitleId: filter.jobTitles}, speakerRole),
          this.getUsersByAssociated(UsersIndustries, filter.industries, {industryId: filter.industries}, speakerRole)
        ])
          .then(response => {
            const filteredSpeakers = _.intersectionBy(
              this.getUsersByAge(speakers, filter.ageFrom, filter.ageTo),
              response[0], response[1], response[2], response[3], 'id');
            return this.getUsersByCity(filteredSpeakers, filter.city);
          })
      })
  }

  getGuests(filter = {}) {
    const queryFilter = {};
    if (filter.gender) {
      queryFilter.gender = filter.gender;
    }
    return Users.findAll({
      where: queryFilter,
      include: userAssociates,
      attributes: defaultUserAttributes
    })
      .then(guests => {
        return Promise.all([
          this.getUsersByAssociated(UsersKeywords, filter.expertises, {wordId: filter.expertises}),
          this.getUsersByAssociated(UsersJobTitles, filter.jobTitles, {jobtitleId: filter.jobTitles}),
        ])
          .then(response => {
            const filteredSpeakers = _.intersectionBy(
              this.getUsersByAge(guests, filter.ageFrom, filter.ageTo), response[0], response[1], 'id');
            return this.getUsersByCity(filteredSpeakers, filter.city);
          })
      })
  }

  findEmailAndPassword(email, password) {

    let emailcrypt = utils.encrypt(email);
    let hashPassword = utils.hashPassword(password);

    return Users.findOne({
      where: {
        email: emailcrypt,
        password: hashPassword,
      }
    })
      .then(user => {
        if (user) {
          return _.pick(user, ['id', 'username', 'surname'])
        }
        return Promise.reject({code: ERRORS_CODE.NOT_FOUND})
      })

  }

}

module.exports = UsersDao;