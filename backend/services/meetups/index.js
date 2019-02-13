'use strict';

const GetAllMeetups = require('./GetMeetups');

/**
 * @type {{
 *
 * GetMeetups: GetMeetups
 * }}
 *
 */

module.exports = {
  GetAllMeetups: new GetAllMeetups(),
};