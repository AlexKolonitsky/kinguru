'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');
const validator = require('./../../common/validate');
const _ = require('lodash');
const utils = require('./../../common/securityAssert');


class AddGuestsToMeetup extends RequestHandlers {


  validate(request) {
    return [
      validator.fieldExist('meetupId', request.body.meetupId),
      validator.fieldExist('guests', request.body.guests),
    ];
  }

  methodAction(request) {
    if (!request.body.guests.length) {
      return Promise.reject(utils.responseError(400, `Guests count is null`));
    }
    return MeetupsDaoHandler.getCurrentMeetup(request.body.meetupId)
      .then(meetup => {
        if (meetup.maxGuestsCount < meetup.guests.length + request.body.guests.length) {
          return Promise.reject(utils.responseError(400, `Max guests count is ` + meetup.maxGuestsCount));
        }
        return MeetupsDaoHandler.addGuestsToMeetup(request.body.meetupId, request.body.guests);
      })
  }

}

module.exports = AddGuestsToMeetup;