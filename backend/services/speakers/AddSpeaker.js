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
    let file = request.file;
    if (!file) {
      return SpeakersDaoHandler.addSpeaker(request.body);
    }
    let filename = Date.now() + '-' + file.originalname;
    let contentType = file.mimetype;

    return this.s3.upload(filename, file.buffer, contentType)
      .then(data => {
        request.body.awsUrl = data.Location;
        request.body.awsKey = data.key;
        return SpeakersDaoHandler.addSpeaker(request.body);
      })

  }

}

module.exports = AddSpeaker;