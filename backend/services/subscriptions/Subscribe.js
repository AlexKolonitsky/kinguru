'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const { SubscriptionsDaoHandler } = require('./../../dao/handlers');
const validator = require('./../../common/validate');



class Subscribe extends RequestHandler {

  validate(request) {
    return _.flatten([
      validator.validateEmail(request.params.email)
    ]);
  }

  methodAction(request) {
    return SubscriptionsDaoHandler.subscribe(request.params.email);
  }

}

module.exports = Subscribe;