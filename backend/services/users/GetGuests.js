'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const { UsersDaoHandler } = require('./../../dao/handlers');


class GetGuests extends RequestHandler {

  methodAction(request, response) {
    return UsersDaoHandler.getGuests(request.body);
  }

}

module.exports = GetGuests;