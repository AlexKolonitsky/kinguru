'use strict';

const GetAllMeetups = require('./GetAllMeetups');

/**
 * @type {{
 *
 * GetMeetups: GetAllMeetups
 * }}
 *
 */

module.exports = {
  GetAllMeetups: new GetAllMeetups(),
};