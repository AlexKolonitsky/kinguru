'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { UsersDaoHandler } = require('./../../dao/handlers');
const utils = require('../../common/securityAssert');


class SetNewPassword extends RequestHandlers {

  methodAction(request) {
    return UsersDaoHandler.setNewPassword(utils.getUserByToken(request.params.id).user, request.body.password);
  }

}

module.exports = SetNewPassword;