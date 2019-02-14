'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');
const validator = require('./../../common/validate');
const _ = require('lodash');
const utils = require('../../common/securityAssert')

/**
 * Is used for getting current meetup
 * @class GetCurrentMeetup
 * @extends RequestHandlers
 */

class GetCurrentMeetup extends RequestHandlers {

  validate(request) {
    validator.validatePositiveNumber('id', request.params.id)
  }


  methodAction(request) {

    let meetupId = request.params.id;

    return MeetupsDaoHandler.getCurrentMeetup(meetupId)
      .then(meetup => {
        if (_.isEmpty(meetup)) {
          return Promise.reject(utils.responseError(404,` Meetup with such id ${meetupId} not found`))
        }
        return Promise.resolve(meetup);
      })
  }

}

module.exports = GetCurrentMeetup;