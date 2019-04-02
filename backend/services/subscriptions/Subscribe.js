'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const { SubscriptionsDaoHandler } = require('./../../dao/handlers');


class Subscribe extends RequestHandler {

  methodAction(request) {
    return SubscriptionsDaoHandler.subscribe(request.params.email);
  }

}

module.exports = Subscribe;