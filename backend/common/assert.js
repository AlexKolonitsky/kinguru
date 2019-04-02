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
  const user = token ? utils.getUserByToken(token) : null;
  if (!token || (!user || !user.user)) {
    return res.status(401).end('User not authorized');
  }
  return true;
}

module.exports = {
  jwt: [jwt, _assertJwt],
  assertJwt: _assertJwt,
  getToken: getToken,
};