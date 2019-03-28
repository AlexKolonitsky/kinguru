'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const { UsersDaoHandler } = require('./../../dao/handlers');
const assert = require('./../../common/assert');


class GetCurrentUser extends RequestHandler {

  methodAction(request) {
    return UsersDaoHandler.getCurrentUser(assert.getToken(request));
  }

}

module.exports = GetCurrentUser;