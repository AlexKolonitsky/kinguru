'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { UsersDaoHandler } = require('./../../dao/handlers');
const utils = require('../../common/securityAssert');


class ConfirmEmail extends RequestHandlers {

  methodAction(request) {
    return UsersDaoHandler.confirmEmail(utils.getUserByToken(request.params.id).user);
  }

}

module.exports = ConfirmEmail;