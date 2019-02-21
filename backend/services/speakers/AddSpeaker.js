'use strict';

const RequestHandler = require('../../common/RequestHandler');
const { SpeakersDaoHandler } = require('../../dao/handlers');
const validator = require('./../../common/validate');
const S3 = require('./../../common/S3');

class AddSpeaker extends RequestHandler {

  constructor() {
    super();
    this.s3 = new S3();
  }

  validate(request) {
    return validator.validateEmail(request.body.email)
  }

  methodAction(request) {

    const { email, name, surname } = request.body;
    let file = request.file;
    let filename = Date.now() + '-' + request.file.originalname;
    let contentType = request.file.mimetype;

    return this.s3.upload(filename, file.buffer, contentType)
      .then(data => {
        let awsUrl = data.Location;
        let awsKey = data.key;
        return SpeakersDaoHandler.addSpeaker(email, name, surname, awsUrl, awsKey);
      })

  }

}

module.exports = AddSpeaker;