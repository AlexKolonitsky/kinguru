'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const { UsersDaoHandler } = require('./../../dao/handlers');


class GetSpeakers extends RequestHandler {

  methodAction(request, response) {
    return UsersDaoHandler.getSpeakers(request.body);
  }

}

module.exports = GetSpeakers;