'use strict';

const GetAllMeetups = require('./GetAllMeetups');
const GetCurrentMeetup = require('./GetCurrentMeetup');
const CreateMeetup = require('./CreateMeetup');
const AddGuestsToMeetup = require('./AddGuestsToMeetup');
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
  AddGuestsToMeetup: new AddGuestsToMeetup(),
  RemoveMeetup: new RemoveMeetup(),
  GetFilter: new GetFilter(),
};