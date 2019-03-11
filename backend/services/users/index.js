'use strict';

const RegistrationUser = require('./RegistrationUser');
const LoginUser = require('./LoginUser');
const GetCurrentUser = require('./GetCurrentUser');

/**
 * @type {{
 * RegistrationUser: RegistrationUser,
 * LoginUser: LoginUser,
 }}
 */

module.exports = {
  RegistrationUser: new RegistrationUser(),
  LoginUser: new LoginUser(),
  GetCurrentUser: new GetCurrentUser(),
};