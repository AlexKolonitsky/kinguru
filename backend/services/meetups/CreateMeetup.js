'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');
const validator = require('../../common/validate');
const S3 = require('./../../common/S3');
const utils = require('./../../common/securityAssert');
const assert = require('./../../common/assert');



/**
 * Is used for create meetup
 * @class CreateMeetup
 * @extends RequestHandlers
 */

class CreateMeetup extends RequestHandlers {

  constructor() {
    super();
    this.s3 = new S3();
  }

  /**
   * @function validate incoming image, title, type
   * @public
   * @override
   * @param request
   * @returns {string}
   */

  validate(request) {
    return [
      validator.fieldExist('title', request.body.title),
      validator.validateRole(1, utils.getUserByToken(assert.getToken(request)).user.role),
      // validator.fieldExist('image', request.body.file)
    ];
  }

  methodAction(request) {

    const filter = request.body;
    filter.tags = filter.tags ? filter.tags.split(',').map(tag => parseInt(tag, 10)) : [];
    filter.speakers = filter.speakers ? filter.speakers.split(',').map(speaker => parseInt(speaker, 10)) : [];
    filter.guests = filter.guests ? filter.guests.split(',').map(guest => parseInt(guest, 10)) : [];
    if (filter.guests.length > filter.maxGuestsCount) {
      return Promise.reject(utils.responseError(400, `Guests count can't be more than the maximum guests count`))
    }

    const file = request.file;
    if (!file) {
      return MeetupsDaoHandler.createMeetup(filter);
    }

    return this.s3.upload(Date.now() + '-' + file.originalname, file.buffer, file.mimetype)
      .then(data => {
        filter.coverSource = data.Location;
        filter.coverKey = data.key;
        return MeetupsDaoHandler.createMeetup(filter)
      })
  }


}

module.exports = CreateMeetup;
