'use strict';

const RegistrationUser = require('./RegistrationUser');
const LoginUser = require('./LoginUser');
const GetCurrentUser = require('./GetCurrentUser');
const UpdateUser = require('./UpdateUser');
const ChangePassword = require('./ChangePassword');

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
  UpdateUser: new UpdateUser(),
  ChangePassword: new ChangePassword(),
};