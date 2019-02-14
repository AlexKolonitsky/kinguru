'use strict';

const GetAllMeetups = require('./GetAllMeetups');
const GetCurrentMeetup = require('./GetCurrentMeetup');

/**
 * @type {{
 *
 * GetAllMeetups: GetAllMeetups
 * GetCurrentMeetup: GetCurrentMeetup
 * }}
 *
 */

module.exports = {
  GetAllMeetups: new GetAllMeetups(),
  GetCurrentMeetup: new GetCurrentMeetup(),
};