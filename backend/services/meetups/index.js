'use strict';

const GetMeetups = require('./GetMeetups');

/**
 * @type {{
 *
 * GetMeetups: GetMeetups
 * }}
 *
 */

module.exports = {
  GetMeetups: new GetMeetups(),
};