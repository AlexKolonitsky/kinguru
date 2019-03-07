'use strict';

const GetAllLocations = require('./GetAllLocations');
const GetCurrentLocation = require('./GetCurrentLocation');


/**
 * @type {{
 *
 * GetAllMeetups: GetAllMeetups
 * GetCurrentMeetup: GetCurrentMeetup
 * }}
 *
 */

module.exports = {
  GetAllLocations: new GetAllLocations(),
  GetCurrentLocation: new GetCurrentLocation(),

};