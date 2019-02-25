'use strict';

const GetAllMeetups = require('./GetAllMeetups');
const GetCurrentMeetup = require('./GetCurrentMeetup');
const CreateMeetup = require('./CreateMeetup');
const RemoveMeetup = require('./RemoveMeetup');
const GetFilter = require('./GetFilter');

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
  RemoveMeetup: new RemoveMeetup(),
  GetFilter: new GetFilter(),
};