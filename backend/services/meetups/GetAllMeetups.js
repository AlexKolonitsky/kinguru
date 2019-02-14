'use strict';

const _ = require('lodash');
const RequestHandlers = require('./../../common/RequestHandler');
const validator = require('./../../common/validate');
const { MeetupsDaoHandler } = require('../../dao/handlers');

/**
 * Is used for getting for all meetups
 * @class GetAllMeetups
 * @extends RequestHandlers
 */

class GetAllMeetups extends RequestHandlers {

  /**
   * @function validate - validate incoming body.limit and offset params
   * @public
   * @override
   * @param {Object} request
   * @returns {Array.<string|undefined>}
   */
  // validate(request) {
  //   return _.flatten([
  //     validator.fieldExist('limit', request.query.limit),
  //     validator.fieldExist('offset', request.query.offset),
  //   ]);
  // }

  /**
   * @function methodAction - get books ids and its title and cover via attachments, ordered by isFreeBook field = 1 at first priority \
   * and last publication data;
   * if offset or limit null or undefined - they will be ignore by sequelize
   * if search parameter provide - searching occurs in 2 steps: by books fields, then by categories and tags fields
   * @param {Object} request
   * @returns {Promise}
   */

  methodAction(request) {

    let { limit, offset, location, type } = request.query;

    if (!isNaN(parseInt(offset))) {
      offset = parseInt(offset);
    }

    if (!isNaN(parseInt(limit))) {
      limit = parseInt(limit);
    }

    return MeetupsDaoHandler.getAllMeetups(limit, offset, location, type)
  }


}


module.exports = GetAllMeetups;