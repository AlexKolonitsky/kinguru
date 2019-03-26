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
      country: userInfo.country,
      city: userInfo.city,
      phone: userInfo.phone,
      faked: userInfo.faked,
      role: userInfo.role,
      coverSource: userInfo.coverSource,
      coverKey: userInfo.coverKey
    }
  }

  createUser(userInfo, hostname) {
    return Users.findOne({
      where: {
        email: userInfo.email
      }
    })
      .then(user => {
        if (!user) {
          const htmlTemplate = `<a href="http://${hostname}:3010/user/confirmation/${utils.getJwtToken(userInfo.email).split(' ')[1]}">Registration confirmation</a>`;
          return nodemailer.sendMail(
            null,
            userInfo.email,
            'KINGURU user confirmation',
            null,
            htmlTemplate,
            hostname
          ).then(() => {
            return Users.create(this.getUserObject(userInfo));
          })
            .catch(sendError => {
              console.log(sendError);
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

  getSpeakersByAssociations(associationTable) {
    const filter = {role: 2};
    if (associationTable) {
      filter.id = _.uniq(_.map(associationTable, 'userId'));
    }
    return Users.findAll({
      where: filter,
      attributes: defaultUserAttributes
    })
  };

  getSpeakersByAssociated(model, ids = [], filter) {
    if (!ids.length) {
      return this.getSpeakersByAssociations();
    }
    return model.findAll({
      where: filter,
    })
      .then(response => {
        return this.getSpeakersByAssociations(response);
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
        return Promise.all([
          this.getSpeakersByAssociated(UsersLanguages, filter.languages, {languageId: filter.languages}),
          this.getSpeakersByAssociated(UsersKeywords, filter.expertises, {wordId: filter.expertises}),
          this.getSpeakersByAssociated(UsersJobTitles, filter.jobTitles, {jobtitleId: filter.jobTitles}),
          this.getSpeakersByAssociated(UsersIndustries, filter.industries, {industryId: filter.industries})
        ])
          .then(response => {
            return _.intersectionBy(speakers
              .filter(speaker => {
                const age = this.calculateAge(speaker.birthday);
                return ((filter.ageFrom || -1) <= age) && (age <= (filter.ageTo || 999));
              }), response[0], response[1], response[2], response[3], 'id');
          })
      })
  }

  findEmailAndPassword(email, password, response) {
    return Users.findOne({
      where: {
        email: email,
        password: utils.hashPassword(password),
      },
      attributes: defaultUserAttributes
    })
      .then(user => {
        if (user) {
          if (!user.confirmed) {
            return response.status(401).end('Please confirm your email to login');
          }
          const token = utils.getJwtToken(user).split(' ')[1];
          return this.getCurrentUser(token, response)
        }
        return response.status(401).end(`User with email: ${email} not found`);
      })
      .catch(err => err);
  }

  getUserById(userId) {
    return Users.findOne({
      where: {
        id: userId
      },
      attributes: defaultUserAttributes
    })
  }

  getUserInfoResponse(user) {
    return {
      user,
      token: utils.getJwtToken(user).split(' ')[1]
    }
  }

  getCurrentUser(token, response, userAttributes) {
    const userInfo = utils.getUserByToken(token).user;
    console.log(userInfo);
    return Users.findOne({
      where: {
        email: userInfo.email
      },
      include: userAssociates,
      attributes: userAttributes || defaultUserAttributes
    })
      .then(user => {
        if (!user) {
          return response.status(403).end('User not authorized');
        }
        if (!user.locationId) {
          return this.getUserInfoResponse(user);
        }
        return Locations.findOne({
          where: {
            id: user.locationId
          },
          attributes: ['country', 'state', 'city', 'address', 'metro', 'phone', 'zipCode', 'place']
        })
          .then(location => {
            if (!location) {
              return this.getUserInfoResponse(user);
            }
            console.log('Hello DIMA');
            user = user.dataValues;
            user.location = location.dataValues;
            return this.getUserInfoResponse(user);
          })
      })
      .catch(err => {
        if (err.code === ERRORS_CODE.NOT_FOUND) {
          return Promise.reject({
            code: 404,
            message: `User with email: ${userInfo.email} not found`
          })
        }
      })
  }

  changePassword(token, password, response) {
    if (password.new !== password.confirm) {
      return response.status(400).end('New password not equal confirm password');
    }
    return this.getCurrentUser(token, response, _.concat(defaultUserAttributes, 'password'))
      .then(userInfo => {
        if (userInfo.user.password !== utils.hashPassword(password.old)) {
          return response.status(403).end('Old password is incorrect');
        }
        return Users.findOne({
          where: {
            id: userInfo.user.id,
            email: userInfo.user.email
          }
        })
          .then(user => {
            return user.update({password: utils.hashPassword(password.new)});
          })
      })
  }

  setLocation(location, locationBeforeUpdated) {
    return {
      country: location.country || locationBeforeUpdated.country,
      state: location.state || locationBeforeUpdated.state,
      city: location.city || locationBeforeUpdated.city,
      zipCode: location.zipCode || locationBeforeUpdated.zipCode,
      address: location.address || locationBeforeUpdated.address,
      metro: location.metro || locationBeforeUpdated.metro,
      place: location.place || locationBeforeUpdated.place,
      email: location.email || locationBeforeUpdated.email,
      phone: location.phone || locationBeforeUpdated.phone,
    }
  }

  updateUser(newUserInfo, token) {
    console.log(newUserInfo);
    const userBeforeUpdated = utils.getUserByToken(token).user;
    return this.updateUserLocation(userBeforeUpdated.locationId, this.setLocation(newUserInfo, userBeforeUpdated.location))
      .then(location => {
        return Users.findOne({
          where: {
            email: userBeforeUpdated.email
          }
        })
          .then(userInfo => {
            return userInfo.update({
              firstname: newUserInfo.firstname || userBeforeUpdated.firstname,
              lastname: newUserInfo.lastname || userBeforeUpdated.lastname,
              description: newUserInfo.description || userBeforeUpdated.description,
              birthday: newUserInfo.birthday || userBeforeUpdated.birthday,
              gender: newUserInfo.gender || userBeforeUpdated.gender,
              phone: newUserInfo.phone || userBeforeUpdated.phone,
              company: newUserInfo.company || userBeforeUpdated.company,
              website: newUserInfo.website || userBeforeUpdated.website,
              linkedinLink: newUserInfo.linkedinLink || userBeforeUpdated.linkedinLink,
              facebookLink: newUserInfo.facebookLink || userBeforeUpdated.facebookLink,
              instagramLink: newUserInfo.instagramLink || userBeforeUpdated.instagramLink,
              coverSource: newUserInfo.coverSource || userBeforeUpdated.coverSource,
              coverKey: newUserInfo.coverKey || userBeforeUpdated.coverKey,
              locationId: location.id
            })
          })
          .then(user => {
            user = user.dataValues;
            user.location = location.dataValues;
            const userInfo = {
              user,
              token: utils.getJwtToken(user).split(' ')[1],
            };
            if (newUserInfo.coverSource) {
              console.log(userBeforeUpdated.coverKey);
              userInfo.oldFileKey = userBeforeUpdated.coverKey;
            }
            return userInfo;
          })
      })
  }

  updateUserLocation(idLocation, newlocationInfo) {
    console.log(idLocation);
    if (idLocation) {
      return Locations.findOne({
        where: {
          id: idLocation
        },
      })
        .then(location => {
          return location.update(this.setLocation(newlocationInfo))
        })
    }
    return Locations.create(this.setLocation(newlocationInfo))
  }

  confirmEmail(email) {
    Users.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        return user.update({confirmed: true})
      })
  }
}

module.exports = UsersDao;