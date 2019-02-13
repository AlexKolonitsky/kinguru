'use strict';

const UsersHandler = require('./users/handler');
const MeetupsHandler = require('./meetups/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
  MeetupsDaoHandler: new MeetupsHandler(),
};