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
          return _.pick(user, ['id', 'username', 'email'])
        }
        return Promise.reject({code: ERRORS_CODE.NOT_FOUND})
      })

  }

}

module.exports = UsersDao;