'use strict';

const GetAllTags = require('./GetAllTags');

/**
 * @type {{
 *
 * GetAllMeetups: GetAllTags
 * }}
 *
 */

module.exports = {
  GetAllTags: new GetAllTags()
};