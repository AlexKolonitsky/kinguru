'use strict';

const RegistrationUser = require('./RegistrationUser');
const LoginUser = require('./LoginUser');

/**
 * @type {{
 * RegistrationUser: RegistrationUser,
 * LoginUser: LoginUser,
 }}
 */

module.exports = {
  RegistrationUser: new RegistrationUser(),
  LoginUser: new LoginUser(),
};