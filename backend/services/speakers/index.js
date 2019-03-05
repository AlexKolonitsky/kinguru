'use strict';

const AddSpeaker = require('./AddSpeaker');
const GetAllSpeakers = require('./GetAllSpeakers');
const RemoveSpeaker = require('./RemoveSpeaker');

module.exports = {
  AddSpeaker: new AddSpeaker(),
  GetAllSpeakers: new GetAllSpeakers(),
  RemoveSpeaker: new RemoveSpeaker,
};