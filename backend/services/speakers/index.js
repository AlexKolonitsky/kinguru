'use strict';

const AddSpeaker = require('./AddSpeaker');
const RemoveSpeaker = require('./RemoveSpeaker');


/**
 * @type {{
 * AddSpeakers: AddSpeakers
 * }}
 */

module.exports = {
  AddSpeaker: new AddSpeaker(),
  RemoveSpeaker: new RemoveSpeaker,
};