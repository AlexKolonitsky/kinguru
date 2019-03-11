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

const { Users } = require('./../index');
const userAttributes = ['id', 'username', 'email', 'country', 'city', 'phone'];

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
        return Promise.reject({ code: ERRORS_CODE.DUPLICATE });
      });
  }

  findEmailAndPassword(email, password) {

    const hashPassword = utils.hashPassword(password);

    return Users.findOne({
      where: {
        email: email,
        password: hashPassword,
      }
    })
      .then(user => {
        if (user) {
          return _.pick(user, userAttributes)
        }
        return Promise.reject({code: ERRORS_CODE.NOT_FOUND})
      })

  }

  getUserById(userId) {
    return Users.findOne({
      where: {
        id: userId
      },
      attributes: userAttributes
    })
      .then(user => {
        return user;
      })
  }

  getCurrentUser(token, response) {
    const userInfo = utils.getUserByToken(token).user;
    return Users.findOne({
      where: {
        id: userInfo.id,
        email: userInfo.email
      },
      attributes: userAttributes
    })
      .then(user => {
        if (!user) {
          return response.status(403).end('User not authorized');
        }
        return {
          user: user,
          token: utils.getJwtToken(user)
        };
      })
      .catch(err => {
        if(err.code === ERRORS_CODE.NOT_FOUND){
          return Promise.reject({
            code: 404,
            message: `User with email: ${userInfo.email} not found`
          })
        }
      })
  }
}

module.exports = UsersDao;