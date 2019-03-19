'use strict';

const _ = require('lodash');
const RequestHandlers = require('./../../common/RequestHandler');
const utils = require('../../common/securityAssert');
const nodemailer = require('../../common/nodemailer');
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

class RegisterUser extends RequestHandlers {

  /**
   * @function validate - validate email for existence and regexp email format, password and username for existence
   * @public
   * @override
   * @param {Object} request
   * @returns {Array.<string|undefined>}
   */

  validate(request) {

    return _.flatten([
      validator.validateEmail(request.body.email),
      validator.fieldExist('password', request.body.password),
      validator.fieldExist('firstname', request.body.firstname),
      validator.fieldExist('lastname', request.body.lastname),
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

    return UsersDaoHandler.createUser(request.body)
      .then(user => {
        const htmlTemplate = `<a href="http://${process.env.HOST}:${process.env.PORT}/user/confirmation/${utils.getJwtToken(user.email).split(' ')[1]}">Registration confirmation</a>`;
        console.log(htmlTemplate);
        return nodemailer.sendMail(
          null,
          user.email,
          'KINGURU user confirmation',
          null,
          htmlTemplate
        )
          .then (info => {
            console.log('User successfully registration');
            return Promise.resolve('Ok');
          })
          .catch((errorSendMail) => {
            return Promise.reject({
              code: 401,
              message: errorSendMail,
            });
          })
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

module.exports = RegisterUser;