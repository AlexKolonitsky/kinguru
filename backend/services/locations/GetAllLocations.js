const RequestHandlers = require('./../../common/RequestHandler');
const {LocationsDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all locations
 * @class GetAllLocations
 * @extends RequestHandlers
 */

class GetAllLocations extends RequestHandlers {

  methodAction(request) {
    return LocationsDaoHandler.getAllLocations()
  }
}

module.exports = GetAllLocations;
