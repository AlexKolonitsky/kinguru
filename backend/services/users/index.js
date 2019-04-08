'use strict';

const RegistrationUser = require('./RegistrationUser');
const LoginUser = require('./LoginUser');
const GetCurrentUser = require('./GetCurrentUser');
const UpdateUser = require('./UpdateUser');
const ChangePassword = require('./ChangePassword');
const ConfirmEmail = require('./ConfirmEmail');
const CreateSpeaker = require('./CreateSpeaker');
const GetSpeakers = require('./GetSpeakers');
const GetGuests = require('./GetGuests');
const ResetPassword = require('./ResetPassword');
const SetNewPassword = require('./SetNewPassword');
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
  ResetPassword: new ResetPassword(),
  SetNewPassword: new SetNewPassword(),
  UpdateUser: new UpdateUser(),
  ChangePassword: new ChangePassword(),
  ConfirmEmail: new ConfirmEmail(),
  CreateSpeaker: new CreateSpeaker(),
  GetSpeakers: new GetSpeakers(),
  GetGuests: new GetGuests()
};
