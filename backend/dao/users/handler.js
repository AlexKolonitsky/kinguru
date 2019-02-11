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
    console.log(userInfo);

    let email = utils.encrypt(userInfo.email);
    console.log(email);

    return Users.findOne({where: {email: email}})
      .then(user => {
        if (!user) {
          return Users.create(userInfo);
        }

        return Promise.reject({code: ERRORS_CODE.DUPLICATE});
      });
  }

}

module.exports = UsersDao;