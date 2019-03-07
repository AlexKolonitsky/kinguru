'use strict';

const _ = require('lodash');
const expressJwt = require('express-jwt');
const utils = require('./securityAssert');

/**
 * @description - is used for validate user's encrypted access jwt token: from headers
 */

function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

const jwt = expressJwt({
  secret: utils.getJwtSecret(),
  credentialsRequired: false,
  getToken: getToken
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
  const token = getToken(req);
  const user = token ? utils.getUserByToken(getToken(req)) : null;
  if (!user || !user.user) {
    console.log(user);
    return res.status(403).end('User not authorized');
  }

  return true;
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
  assertJwt: _assertJwt,
  access: assertRole,
};