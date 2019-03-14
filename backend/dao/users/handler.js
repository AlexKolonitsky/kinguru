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

const {Users, Locations} = require('./../index');
const defaultUserAttributes = [
  'id', 'firstname', 'lastname', 'email', 'description', 'birthday', 'gender',
  'locationId', 'company', 'website', 'linkedinLink', 'facebookLink', 'instagramLink',
  'coverSource', 'coverKey', 'createdAt', 'updatedAt'
];

class UsersDao {

  createUser(userInfo) {

    return Users.findOne({
      where: {
        email: userInfo.email
      }
    })
      .then(user => {
        if (!user) {
          return Users.create({
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            country: userInfo.country,
            city: userInfo.city,
            phone: userInfo.phone
          });
        }
        return Promise.reject({code: ERRORS_CODE.DUPLICATE});
      });
  }

  findEmailAndPassword(email, password) {
    return Users.findOne({
      where: {
        email: email,
        password: utils.hashPassword(password),
      }
    })
      .then(user => {
        if (user) {
          return _.pick(user, defaultUserAttributes)
        }
        return Promise.reject({code: ERRORS_CODE.NOT_FOUND})
      })
      .catch(err => console.log("error", err));

  }

  getUserById(userId) {
    return Users.findOne({
      where: {
        id: userId
      },
      attributes: defaultUserAttributes
    })
      .then(user => {
        return user;
      })
  }

  getCurrentUser(token, response, userAttributes) {
    const userInfo = utils.getUserByToken(token).user;
    return Users.findOne({
      where: {
        id: userInfo.id,
        email: userInfo.email
      },
      attributes: userAttributes || defaultUserAttributes
    })
      .then(user => {
        if (!user) {
          return response.status(403).end('User not authorized');
        }
        if (!user.locationId) {
          return {
            user,
            token: utils.getJwtToken(user).split(' ')[1]
          };
        }
        return Locations.findOne({
          where: {
            id: user.locationId
          },
          attributes: [ 'country', 'state', 'city', 'address', 'metro', 'phone', 'zipCode' ]
        })
          .then(location => {
            user = user.dataValues;
            user.location = location.dataValues;
            return {
              user,
              token: utils.getJwtToken(user).split(' ')[1]
            };
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
}

module.exports = UsersDao;