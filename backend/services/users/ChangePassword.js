'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const { UsersDaoHandler } = require('./../../dao/handlers');
const utils = require('./../../common/securityAssert');
const assert = require('./../../common/assert');


class ChangePassword extends RequestHandler {

  methodAction(request) {
    return UsersDaoHandler.changePassword(assert.getToken(request), request.body)
      .then(user => {
        const token = utils.getJwtToken(user).split(' ')[1];
        return Promise.resolve({ user, token })
      })
      .catch(error => {
        return Promise.reject(error);
      })
  }

}

module.exports = ChangePassword;