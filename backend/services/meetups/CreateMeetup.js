'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');
const validator = require('../../common/validate');

/**
 * Is used for create meetup
 * @class CreateMeetup
 * @extends RequestHandlers
 */

class CreateMeetup extends RequestHandlers {

  /**
   * @function validate incoming meetupImage, title, type
   * @public
   * @override
   * @param request
   * @returns {string}
   */

    validate(request) {
      return [
        validator.fieldExist('meetupImage', request.file),
        validator.fieldExist('title', request.body.title),
        validator.fieldExist('type', request.body.type),
      ];
    }

  methodAction(request) {

    let { type, title, location, isFree, date, speakers} = request.body;
    let meetupImage = request.file;

    return MeetupsDaoHandler.createMeetup(type, title, location, isFree, date, speakers, meetupImage)
  }


}

module.exports = CreateMeetup;