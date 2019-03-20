'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const validator = require('./../../common/validate');
const { UsersDaoHandler } = require('./../../dao/handlers');
const _ = require('lodash');


class LoginUser extends RequestHandler {

  validate(request) {
    return _.flatten([
      validator.validateEmail(request.body.email),
      validator.fieldExist('password', request.body.password),
    ]);

  }

  methodAction(request, response) {
    const userRequest = request.body;

    return UsersDaoHandler.findEmailAndPassword(userRequest.email, userRequest.password, response);
  }

}

module.exports = LoginUser;