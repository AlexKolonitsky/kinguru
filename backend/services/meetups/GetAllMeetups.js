'use strict';

const _ = require('lodash');
const RequestHandlers = require('./../../common/RequestHandler');
const {MeetupsDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all meetups
 * @class GetAllMeetups
 * @extends RequestHandlers
 */

class GetAllMeetups extends RequestHandlers {

  /**
   * @function methodAction - get all meetups
   * if offset or limit null or undefined - they will be ignore by sequelize
   * if search parameter provide - searching occurs in 2 steps: by books fields, then by categories and tags fields
   * @param {Object} request
   * @returns {Promise}
   */

  methodAction(request) {

    let {limit, offset, city, tags, cities, isRecent} = request.body;

    if (!isNaN(parseInt(offset))) {
      offset = parseInt(offset);
    }

    if (!isNaN(parseInt(limit))) {
      limit = parseInt(limit);
    }

    return MeetupsDaoHandler.getAllMeetups(limit, offset, tags, cities, isRecent)
  }


}


module.exports = GetAllMeetups;