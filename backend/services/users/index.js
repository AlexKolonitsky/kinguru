'use strict';

const RegistrationUser = require('./RegistrationUser');
const LoginUser = require('./LoginUser');
const GetCurrentUser = require('./GetCurrentUser');
const UpdateUser = require('./UpdateUser');
const ChangePassword = require('./ChangePassword');
const ConfirmEmail = require('./ConfirmEmail');
const CreateSpeaker = require('./CreateSpeaker');
const GetSpeakers = require('./GetSpeakers');

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
  ConfirmEmail: new ConfirmEmail(),
  CreateSpeaker: new CreateSpeaker(),
  GetSpeakers: new GetSpeakers(),
};