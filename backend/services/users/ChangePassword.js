'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const { UsersDaoHandler } = require('./../../dao/handlers');
const utils = require('./../../common/securityAssert');
const assert = require('./../../common/assert');


class ChangePassword extends RequestHandler {

  methodAction(request, response) {
    return UsersDaoHandler.changePassword(assert.getToken(request), request.body, response)
      .then(user => {
        const token = utils.getJwtToken(user).split(' ')[1];
        return Promise.resolve({ user, token })
      })
  }

}

module.exports = ChangePassword;