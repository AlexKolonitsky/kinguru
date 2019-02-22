'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const validator = require('./../../common/validate');
const { UsersDaoHandler } = require('./../../dao/handlers');


class LoginUser extends RequestHandler {

  validate(request) {
    return [
      validator.fieldExist('email', request.body.email),
      validator.fieldExist('password', request.body.password)
    ]
  }

  methodAction(request) {

    let email = request.body.email;
    let password = request.body.password;

    return UsersDaoHandler.findEmailAndPassword(email, password)

  }

}

module.exports = LoginUser;