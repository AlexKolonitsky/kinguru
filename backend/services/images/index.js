'use strict';

const AddUserImages = require('./AddUserImages');
const AddImages = require('./AddImages');
const GetMeetupImages = require('./GetMeetupImages');
const GetLocationImages = require('./GetLocationImages');

module.exports = {
  AddUserImages: new AddUserImages(),
  AddImages: new AddImages(),
  GetMeetupImages: new GetMeetupImages(),
  GetLocationImages: new GetLocationImages(),
};