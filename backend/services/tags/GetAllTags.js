'use strict';

const _ = require('lodash');
const RequestHandlers = require('./../../common/RequestHandler');
const {TagsDaoHandler} = require('../../dao/handlers');

/**
 * Is used for getting for all tags
 * @class GetAllTags
 * @extends RequestHandlers
 */

class GetAllTags extends RequestHandlers {

  /**
   * @function methodAction - get all tags
   * @param {Object} request
   * @returns {Promise}
   */

  methodAction(request) {
    return TagsDaoHandler.getAllTags()
  }


}


module.exports = GetAllTags;