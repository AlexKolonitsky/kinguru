'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { UsersDaoHandler, ImagesDaoHandler } = require('../../dao/handlers');
const assert = require('./../../common/assert');
const S3 = require('./../../common/S3');

class AddUserImages extends RequestHandlers {

  constructor() {
    super();
    this.s3 = new S3();
  }

  methodAction(request, response) {

    console.log('===============');
    let file = request.file;
    /*let file = request.file;
    let filename = Date.now() + '-' + file.originalname;
    let contentType = file.mimetype;*/

    /*return this.s3.upload(filename, file.buffer, contentType)
      .then(data => {
        console.log('req.body', request.body);
        console.log('s3 response', data);*/
        return UsersDaoHandler.getCurrentUser(assert.getToken(request), response)
          .then(user => {
            return user;
          });
  /*    })*/
  }


}

module.exports = AddUserImages;