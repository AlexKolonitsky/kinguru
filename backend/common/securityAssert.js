'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ONE_DAY = 86400;

const SECURITY = {
  PASSWORD_SECRET: 'NXDK8cmEX9bj8Tq29pM2PdRf',
  JWT_SECRET: 'kinguru',
  TOKEN_EXPIRE_TIME: ONE_DAY,
  ENCRYPTION_KEY: '61XT%vG8h8BO5Wy5CXV7F$+W2daII9WV',
  SALT: 'e2bed9a5c4369e16d2c35f4d875da462',
};

const ERRORS_CODE = {
  DUPLICATE: 'duplicate',
  NOT_FOUND: 'not_found',
  NOT_MATCH_PASSWORD: 'not_match_password',
  PASSWORD_NOT_RESET: 'password_not_reset',
  NOT_ENOUGH_RESOURCES: 'not_enough_resources',
  OPERATION_WAS_CONDUCTED: 'operation_was_conducted',
  INVALID_PURCHASE: 'invalid_purchase',
};

/**
 * @hashPassword
 * @param {string} password
 * @returns {string}
 */
function hashPassword(password) {
  return crypto.createHmac('sha256', SECURITY.ENCRYPTION_KEY)
    .update(password)
    .digest('hex');
}

/**
 * @function getJwtToken - return encrypted user's info in jwt format: Bearer ...
 * @param {Object} userInfo
 * @returns {string}
 */
function getJwtToken(userInfo) {
  return `Bearer ${jwt.sign({ user: userInfo }, SECURITY.JWT_SECRET, { expiresIn: SECURITY.TOKEN_EXPIRE_TIME })}`;
}

/**
 * @function encrypt - is using for encrypting incoming string, e.g. email
 * @param {string} value
 * @returns {string}
 */
function encrypt(value) {
  let cipher = crypto.createCipheriv('aes-256-cbc',  Buffer.from(SECURITY.ENCRYPTION_KEY),  Buffer.from(SECURITY.SALT, 'hex'));
  let encrypted = cipher.update(value);

  return Buffer.concat([encrypted, cipher.final()]).toString('hex');
}

/**
 * @function decrypt - is using for encrypting incoming string, e.g. email
 * @param {string} value
 * @returns {string}
 */
function decrypt(value) {

  let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(SECURITY.ENCRYPTION_KEY), new Buffer(SECURITY.SALT, 'hex'));
  let decrypted = decipher.update(new Buffer(value, 'hex'));

  return Buffer.concat([decrypted, decipher.final()]).toString();
}

/**
 * @function generatePassword - for receiving temporary password if user forgot it
 * @returns {string}
 */
function generatePassword() {
  return crypto.randomBytes(12).toString('hex');
}

/**
 * @function responseError - transform incoming params to object for RequestHandler
 * @param {number} code
 * @param {string} message
 * @returns {{code: number, message: string}}
 */
function responseError(code, message) {
  return {
    code,
    message,
  };
}

/**
 * @function getJwtSecret - for receiving secret jwt key
 * @returns {string}
 */
function getJwtSecret() {
  return SECURITY.JWT_SECRET;
}

module.exports = {
  ERRORS_CODE,
  hashPassword,
  getJwtToken,
  encrypt,
  decrypt,
  generatePassword,
  responseError,
  getJwtSecret,
};