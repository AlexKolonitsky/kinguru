'use strict';

const UsersHandler = require('./users/handler');
const MeetupsHandler = require('./meetups/handler');
const SpeakersHandler = require('./speakers/handler');
const LocationsHandler = require('./locations/handler');
const CommentsHandler = require('./comments/handler');
const TagsHandler = require('./tags/handler');
const ImagesHandler = require('./images/handler');
const LanguagesHandler = require('./languages/handler');
const IndustriesHandler = require('./industries/handler');
const JobTitlesHandler = require('./jobtitles/handler');
const WordKeysHandler = require('./wordkeys/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
  MeetupsDaoHandler: new MeetupsHandler(),
  SpeakersDaoHandler: new SpeakersHandler(),
  LocationsDaoHandler: new LocationsHandler(),
  CommentsDaoHandler: new CommentsHandler(),
  TagsDaoHandler: new TagsHandler(),
  ImagesDaoHandler: new ImagesHandler(),
  LanguagesDaoHandler: new LanguagesHandler(),
  IndustriesDaoHandler: new IndustriesHandler(),
  JobTitlesDaoHandler: new JobTitlesHandler(),
  WordKeysDaoHandler: new WordKeysHandler(),
};