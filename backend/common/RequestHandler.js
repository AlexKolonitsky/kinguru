'use strict';

/**
 * @typedef {Object} CustomError
 * @property {string} customMessage - short description of error
 * @property {Object} message - full run time error
 * @property {number} [code] - status code for response
 */

const _ = require('lodash');
const utils = require('./securityAssert');
const assert = require('./assert');


/**
 * @type {Symbol} handleErrors - private method for logging, sending error in http response, call next() middleware
 */
const handleErrors = Symbol('handleErrors');

/**
 * @type {Symbol} handleSuccess - private method for sending result in http response, call next() middleware
 */
const handleSuccess = Symbol('handleSuccess');

/**
 * @type {Symbol} refreshToken - private method for increase inspiration time by getting new ExpressJWT token
 */
const refreshToken = Symbol('refreshToken');

class RequestHandlers {

  /**
   * @function validate
   * @description Default implementation - no errors. Classes that use it can receive Request object
   * @public
   * @param {...Object}
   * @returns {Array}
   */
  validate() {
    return [];
  }

  /**
   * @function refreshToken - used Symbols for imitation private behavior
   * @param {Object} reqUser - ExpressJWT token object
   * @returns {string} - ExpressJWT Authorization token
   */
  [refreshToken](reqUser) {
    if (reqUser && reqUser.user) {
      return utils.getJwtToken(reqUser.user);
    }
  }

  /**
   * @function methodAction
   * @description Default implementation - string 'Ok'. Classes that use it can receive Request and Response object
   * @public
   * @param {...Object}
   * @returns {Promise|string|Object}
   */
  methodAction() {
    console.log('No implementation');
    return 'Ok';
  }

  /**
   * @function handleErrors - used Symbols for imitation private behavior
   * @param {Object} errorMessage - message of runtime programm error - {@link CustomError.message}
   * @param {number} [errorCode=400] - response error code
   * @param {string} customMessage - short identification of problem - {@link CustomError.customMessage}
   * @param {Object} response - restify Response object
   * @param {Function} next - middleware
   * @private
   */
  [handleErrors] (errorMessage, errorCode, customMessage, response, next) {
    console.error(customMessage || '', errorMessage);
    response.status(errorCode).end(errorMessage);
    next();
  }

  /**
   * @function handleSuccess - used Symbols for imitation private behavior
   * @param {Object} result - rest api result
   * @param {Object} response - restify Response object
   * @param {Function} next - middleware
   * @private
   */
  [handleSuccess] (result, response, next) {
    response.send(result);
    next();
  }

  /**
   * @description - main Template Method function
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @returns {*}
   */
  process(request, response, next, isAuthorized) {
    const errors = _.compact(this.validate(request));

    if (!_.isEmpty(errors)) {
      response.status(400).json({ errors: errors });
      return next();
    }

    let newToken = this[refreshToken](request.user);
    if (newToken) {
      response.header('Authorization', newToken);
    }
    const user = assert.assertJwt(request, response, next);
    if (isAuthorized && !user) {
      return;
    }

    this.methodAction(request, response)
      .then((result) => this[handleSuccess](result, response, next))
      .catch((error) => this[handleErrors](error.message || error, error.code || 400,
        error.customMessage, response, next));

  }
}

module.exports = RequestHandlers;