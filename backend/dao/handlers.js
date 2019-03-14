'use strict';

const UsersHandler = require('./users/handler');
const MeetupsHandler = require('./meetups/handler');
const SpeakersHandler = require('./speakers/handler');
const LocationsHandler = require('./locations/handler');
const CommentsHandler = require('./comments/handler');
const TagsHandler = require('./tags/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
  MeetupsDaoHandler: new MeetupsHandler(),
  SpeakersDaoHandler: new SpeakersHandler(),
  LocationsDaoHandler: new LocationsHandler(),
  CommentsDaoHandler: new CommentsHandler(),
  TagsDaoHandler: new TagsHandler(),
};