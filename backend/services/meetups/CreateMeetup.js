'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');
const validator = require('../../common/validate');
const S3 = require('./../../common/S3');

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
      validator.fieldExist('type', request.body.type),
      validator.fieldExist('image', request.file),
    ];
  }

  methodAction(request) {

    let { type, title, location, isFree, date, speakers } = request.body;
    let file = request.file;
    let filename = Date.now() + '-' + request.file.originalname;
    let contentType = request.file.mimetype;

    return this.s3.upload(filename, file.buffer, contentType)
      .then(data => {
        let awsUrl = data.Location;
        let awsKey = data.key;
        return MeetupsDaoHandler.createMeetup(type, title, location, isFree, date, speakers, awsUrl, awsKey)
      })
  }


}

module.exports = CreateMeetup;