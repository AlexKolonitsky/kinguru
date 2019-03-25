'use strict';

const GetMeetupComments = require('./GetMeetupComments');
const GetSpeakerComments = require('./GetSpeakerComments');
const GetLocationComments = require('./GetLocationComments');
const GetSpeakerRate = require('./GetSpeakerRate');
const CreateComment = require('./CreateComment');

module.exports = {
  GetMeetupComments: new GetMeetupComments(),
  GetSpeakerComments: new GetSpeakerComments(),
  GetLocationComments: new GetLocationComments(),
  GetSpeakerRate: new GetSpeakerRate(),
  CreateComment: new CreateComment(),
};
