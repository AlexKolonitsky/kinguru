'use strict';

const _ = require('lodash');
const utils = require('./../../common/securityAssert');
const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');
const validator = require('../../common/validate');
const S3 = require('./../../common/S3');

/**
 * Is used for create meetup
 * @class CreateMeetup
 * @extends RequestHandlers
 */

class RemoveMeetup extends RequestHandlers {

  constructor() {
    super();
    this.s3 = new S3();
  }

  /**
   * @function validate meetupId
   * @public
   * @override
   * @param request
   * @returns {string}
   */

  validate(request) {
    return [
      validator.fieldExist('id', request.params.id),

    ];
  }

  methodAction(request) {

    let meetupId = request.params.id;

    return MeetupsDaoHandler.getCurrentMeetup(meetupId)
      .then(meetup => {

        if (_.isEmpty(meetup)) {
          return Promise.reject(utils.responseError(404, `Meetup with such id doesn't exist`));
        }
        return Promise.all([
          this.s3.deleteObject(meetup.key),
          meetup.destroy(),
        ])
      })
      .then(() => Promise.resolve('ok'))
  }
}

module.exports = RemoveMeetup;