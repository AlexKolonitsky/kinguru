'use strict';

const _ = require('lodash');
const RequestHandlers = require('./../../common/RequestHandler');
const {CommentsDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all meetups
 * @class GetAllMeetups
 * @extends RequestHandlers
 */

class GetMeetupComments extends RequestHandlers {

  /**
   * @function methodAction - get all meetups
   * if offset or limit null or undefined - they will be ignore by sequelize
   * if search parameter provide - searching occurs in 2 steps: by books fields, then by categories and tags fields
   * @param {Object} request
   * @returns {Promise}
   */

  methodAction(request) {
    return CommentsDaoHandler.getMeetupComments(
      !isNaN(parseInt(request.params.meetupId)) ? parseInt(request.params.meetupId) : null
    );
  }


}


module.exports = GetMeetupComments;