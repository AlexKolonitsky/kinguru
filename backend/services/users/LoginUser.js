'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const validator = require('./../../common/validate');
const { UsersDaoHandler } = require('./../../dao/handlers');
const _ = require('lodash');
const utils = require('./../../common/securityAssert');
const ERRORS_CODE = utils.ERRORS_CODE;


class LoginUser extends RequestHandler {

  validate(request) {
    return _.flatten([
      validator.validateEmail(request.body.email),
      validator.fieldExist('password', request.body.password),
    ]);

  }

  methodAction(request, response) {
    const userRequest = request.body;

    return UsersDaoHandler.findEmailAndPassword(userRequest.email, userRequest.password)
      .then(user => {
        const token = utils.getJwtToken(user).split(' ')[1];
        return Promise.resolve({user, token})
      })
      .catch(err => {
        if(err.code === ERRORS_CODE.NOT_FOUND){
          return Promise.reject({
            code: 404,
            message: `User with email: ${user.email} not found`
          })
        }
      })
  }

}

module.exports = LoginUser;