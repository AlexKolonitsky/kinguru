const RequestHandlers = require('./../../common/RequestHandler');
const {SpeakersDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all speakers
 * @class GetAllSpeakers
 * @extends RequestHandlers
 */

class GetAllSpeakers extends RequestHandlers {

  /**
   * @function methodAction - get all meetups
   * if offset or limit null or undefined - they will be ignore by sequelize
   * if search parameter provide - searching occurs in 2 steps: by books fields, then by categories and tags fields
   * @returns {Promise}
   */

  methodAction() {
    return SpeakersDaoHandler.getAllSpeakers()
  }


}


module.exports = GetAllSpeakers;