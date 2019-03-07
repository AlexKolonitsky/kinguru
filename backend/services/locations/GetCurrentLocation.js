const RequestHandlers = require('./../../common/RequestHandler');
const validator = require('./../../common/validate');
const _ = require('lodash');
const {LocationsDaoHandler} = require('../../dao/handlers');
const utils = require('./../../common/securityAssert');


/**
 * Is used for getting for all locations
 * @class GetCurrentLocations
 * @extends RequestHandlers
 */

class GetCurrentLocation extends RequestHandlers {

  validate(request) {
    return [
      validator.fieldExist('id', request.params.id)
    ];
  }

  methodAction(request) {
    const locationId = request.params.id;

    return LocationsDaoHandler.getCurrentLocation(locationId)
      .then(location => {
        if (_.isEmpty(location)) {
          return Promise.reject(utils.responseError(404,` Location with such id ${locationId} not found`))
        }
        return Promise.resolve(location);
      })
  }
}

module.exports = GetCurrentLocation;
