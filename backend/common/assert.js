'use strict';

const _ = require('lodash');
const expressJwt = require('express-jwt');
const utils = require('./securityAssert');

/**
 * @description - is used for validate user's encrypted access jwt token: from headers
 */
const jwt = expressJwt({
  secret: utils.getJwtSecret(),
  credentialsRequired: false,
  getToken: function (req) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }

    return null;
  },

});

/**
 * @function _assertJwt - is used to check if user provide valid jwt token, decrypted user is saved to req.user property
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Function|Error}
 * @private
 */
function _assertJwt(req, res, next) {

  if (!req.user || !req.user.user) {
    return res.status(403).end('User not authorized');
  }

  return next();
}

/**
 * @function assertRole - for asserting user's permission for suggested operation
 * @param {string} role
 * @returns {Function} _assertPerm
 */
function assertRole(role) {
  return function _assertPerm(req, res, next) {

    if (!role) {
      return res.status(403).end('No role was specified to assert');
    }

    if (req.user.user.role !== role) {
      return res.status(403).end('User did not assert the required permissions');
    }

    return next();
  };
}

module.exports = {
  jwt: [jwt, _assertJwt],
  access: assertRole,
};