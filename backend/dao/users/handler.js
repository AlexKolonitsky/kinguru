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
    return Users.findOne({
      where: {
        email: userInfo.email
      }
    })
      .then(user => {
        if (!user) {
          const email = userInfo.email;
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
            return Promise.reject({
              code: 401,
              message: 'Please confirm your email to login'
            })
          }
          const token = utils.getJwtToken(user).split(' ')[1];
          return this.getCurrentUser(token)
        }
        return Promise.reject({
          code: 401,
          message: `User with email: ${email} not found`
        });
      })
  }

  getUserById(userId) {
    return Users.findById(userId);
  }

  getUserInfoResponse(user) {
    return {
      user,
      token: utils.getJwtToken(user).split(' ')[1]
    }
  }

  getCurrentUser(token, userAttributes) {
    const userInfo = utils.getUserByToken(token).user;
    return Users.findOne({
      where: {
        email: userInfo.email
      },
      include: userAssociates,
      attributes: userAttributes || defaultUserAttributes
    })
      .then(user => {
        if (!user) {
          return Promise.reject({
            code: 403,
            message: `User not authorized`
          });
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

  changePassword(token, password) {
    if (password.new !== password.confirm) {
      return Promise.reject({
        code: 400,
        message: 'New password not equal confirm password'
      });
    }
    return this.getCurrentUser(token, _.concat(defaultUserAttributes, 'password'))
      .then(userInfo => {
        if (userInfo.user.password !== utils.hashPassword(password.old)) {
          return Promise.reject({
            code: 403,
            message: 'Old password is incorrect'
          });
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
    const userBeforeUpdated = utils.getUserByToken(token).user;
    return this.updateUserLocation(userBeforeUpdated.locationId, this.setLocation(newUserInfo, userBeforeUpdated.location))
      .then(location => {
        console.log(userBeforeUpdated.email);
        return Users.findOne({
          where: {
            email: userBeforeUpdated.email
          },
        })
          .then(userInfo => {
            return userInfo.update({
              firstname: newUserInfo.firstname || userBeforeUpdated.firstname,
              lastname: newUserInfo.lastname || userBeforeUpdated.lastname,
              description: newUserInfo.description || userBeforeUpdated.description,
              birthday: newUserInfo.birthday || userBeforeUpdated.birthday,
              gender: newUserInfo.gender || userBeforeUpdated.gender,
              phone: newUserInfo.phone || userBeforeUpdated.phone,
              cost: newUserInfo.cost || userBeforeUpdated.cost,
              company: newUserInfo.company || userBeforeUpdated.company,
              website: newUserInfo.website || userBeforeUpdated.website,
              linkedinLink: newUserInfo.linkedinLink || userBeforeUpdated.linkedinLink,
              facebookLink: newUserInfo.facebookLink || userBeforeUpdated.facebookLink,
              instagramLink: newUserInfo.instagramLink || userBeforeUpdated.instagramLink,
              coverSource: newUserInfo.coverSource || userBeforeUpdated.coverSource,
              coverKey: newUserInfo.coverKey || userBeforeUpdated.coverKey,
              locationId: location ? location.id : userBeforeUpdated.locationId
            })
              .then(user => {
                const associatedPromises = [];
                if (newUserInfo.languages && newUserInfo.languages.length) {
                  associatedPromises.push(this.updateUserAssociated(UsersLanguages, newUserInfo.languages, user.id, 'languageId'))
                }
                if (newUserInfo.jobTitles && newUserInfo.jobTitles.length) {
                  associatedPromises.push(this.updateUserAssociated(UsersJobTitles, newUserInfo.jobTitles, user.id, 'jobtitleId'))
                }
                if (newUserInfo.keywords && newUserInfo.keywords.length) {
                  associatedPromises.push(this.updateUserAssociated(UsersKeywords, newUserInfo.keywords, user.id, 'wordId'))
                }
                if (newUserInfo.industries && newUserInfo.industries.length) {
                  associatedPromises.push(this.updateUserAssociated(UsersIndustries, newUserInfo.industries, user.id, 'industryId'))
                }
                if (associatedPromises.length) {
                  return Promise.all(associatedPromises)
                    .then(() => {
                      return this.getCurrentUser(token);
                    })
                }
                return this.getCurrentUser(token);
              })
          })
      })
  }

  updateUserAssociated(associatedModel, associatedArray, userId, field) {
    return associatedModel.findAll({
      where: {
        userId: userId
      }
    })
      .then(response => {
        const removedUsersLanguages = response.filter(item => !associatedArray.includes(item[field]));
        const destroyPromises = [];
        removedUsersLanguages.forEach(item => destroyPromises.push(item.destroy()));
        return Promise.all(destroyPromises)
          .then(() => {
            const filter = {userId: userId};
            filter[field] = associatedArray;
            return associatedModel.findOrCreate({
              where: filter
            })
          })
      });
  }

  updateUserLocation(idLocation, newlocationInfo) {
    if (newlocationInfo) {
      return Promise.resolve(null);
    }
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
    return Users.findOne({
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