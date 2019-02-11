'use strict';

const RegistrationUser = require('./RegistrationUser');

/**
 * @type {{
 * RegistrationUser: RegistrationUser,
 * LoginUser: LoginUser,
 }}
 */

module.exports = {
  RegistrationUser: new RegistrationUser(),
};