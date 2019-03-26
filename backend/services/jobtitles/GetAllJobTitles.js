const RequestHandlers = require('./../../common/RequestHandler');
const {JobTitlesDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all locations
 * @class GetAllJobTitles
 * @extends RequestHandlers
 */

class GetAllJobTitles extends RequestHandlers {

  methodAction(request) {
    return JobTitlesDaoHandler.getAllJobTitles()
  }
}

module.exports = GetAllJobTitles;
