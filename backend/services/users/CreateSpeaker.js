'use strict';

const RequestHandler = require('../../common/RequestHandler');
const { UsersDaoHandler } = require('../../dao/handlers');
const validator = require('./../../common/validate');
const S3 = require('./../../common/S3');

class CreateSpeaker extends RequestHandler {

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
      return UsersDaoHandler.createSpeaker(request.body);
    }

    return this.s3.upload(Date.now() + '-' + file.originalname, file.buffer, file.mimetype)
      .then(data => {
        request.body.awsUrl = data.Location;
        request.body.awsKey = data.key;
        return UsersDaoHandler.createSpeaker(request.body);
      })

  }

}

module.exports = CreateSpeaker;