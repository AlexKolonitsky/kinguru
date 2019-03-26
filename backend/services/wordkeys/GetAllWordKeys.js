const RequestHandlers = require('./../../common/RequestHandler');
const {WordKeysDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all locations
 * @class GetAllWordKeys
 * @extends RequestHandlers
 */

class GetAllWordKeys extends RequestHandlers {

  methodAction(request) {
    return WordKeysDaoHandler.getAllJobTitles()
  }
}

module.exports = GetAllWordKeys;
