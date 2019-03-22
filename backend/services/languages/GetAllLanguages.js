const RequestHandlers = require('./../../common/RequestHandler');
const {LanguagesDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all locations
 * @class GetAllLanguages
 * @extends RequestHandlers
 */

class GetAllLanguages extends RequestHandlers {

  methodAction(request) {
    return LanguagesDaoHandler.getAllLanguages()
  }
}

module.exports = GetAllLanguages;
