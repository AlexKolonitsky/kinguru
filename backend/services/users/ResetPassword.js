'use strict';

const _ = require('lodash');
const RequestHandlers = require('./../../common/RequestHandler');
const utils = require('../../common/securityAssert');
const validator = require('./../../common/validate');
const ERRORS_CODE = utils.ERRORS_CODE;

const {
  UsersDaoHandler,
} = require('./../../dao/handlers');

/**
 * Is used for registration user - User is added to db, but can't log in without confirmation
 * @class RegistrationUser
 * @extends RequestHandlers
 */

class ResetPassword extends RequestHandlers {

  /**
   * @function validate - validate email for existence and regexp email format
   * @public
   * @override
   * @param {Object} request
   * @returns {Array.<string|undefined>}
   */

  validate(request) {
    return _.flatten([
      validator.validateEmail(request.body.email),
    ]);
  }

  /**
   * @function methodAction - register user
   * @description
   *              1. Find if user with suggested email exists
   *              2. If no - create new
   *              3. email is stored in db in encrypted state
   * @param {Object} request
   * @returns {Promise}
   */

  methodAction(request) {
    return UsersDaoHandler.sendEmailForResetPassword(request.body, request.body.link)
      .then(() => {
        console.log('User successfully registration');
        return Promise.resolve({
          code: 200,
          message: 'Ok',
        });
      })
      .catch((err) => {
        if (err.code === ERRORS_CODE.DUPLICATE) {
          return Promise.reject({
            code: 401,
            message: `The user with email '${request.body.email}' has already been registered`,
          });
        }
        return Promise.reject(err);
      });
  }
}

module.exports = ResetPassword;
