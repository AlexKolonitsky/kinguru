'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const validator = require('./../../common/validate');
const { UsersDaoHandler } = require('./../../dao/handlers');
const _ = require('lodash');
const utils = require('./../../common/securityAssert');


class LoginUser extends RequestHandler {

  validate(request) {
    return _.flatten([
      validator.validateEmail(request.body.email),
      validator.fieldExist('password', request.body.password),
    ]);

  }

  methodAction(request, response) {
    let email = request.body.email;
    let password = request.body.password;

    return UsersDaoHandler.findEmailAndPassword(email, password)
      .then(user => {

        response.header('Authorization', utils.getJwtToken(user));
        return Promise.resolve(user)

      })

  }

}

module.exports = LoginUser;