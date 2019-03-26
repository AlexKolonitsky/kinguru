const RequestHandlers = require('./../../common/RequestHandler');
const {IndustriesDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all locations
 * @class GetAllIndustries
 * @extends RequestHandlers
 */

class GetAllIndustries extends RequestHandlers {

  methodAction(request) {
    return IndustriesDaoHandler.getAllIndustries()
  }
}

module.exports = GetAllIndustries;
