'use strict';

const GetAllMeetups = require('./GetAllMeetups');
const GetCurrentMeetup = require('./GetCurrentMeetup');
const CreateMeetup = require('./CreateMeetup');

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
  CreateMeetup: new CreateMeetup(),
};