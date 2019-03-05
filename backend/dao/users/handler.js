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
          return Users.create(userInfo);
        }
        return Promise.reject({ code: ERRORS_CODE.DUPLICATE });
      });
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