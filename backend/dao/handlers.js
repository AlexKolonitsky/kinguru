'use strict';

const UsersHandler = require('./users/handler');
const MeetupsHandler = require('./meetups/handler');
const SpeakersHandler = require('./speakers/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
  MeetupsDaoHandler: new MeetupsHandler(),
  SpeakersDaoHandler: new SpeakersHandler(),
};