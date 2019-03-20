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

    let files = request.files;
    const promises = [];
    files.forEach(file => {
      promises.push(
        this.s3.upload(Date.now() + '-' + file.originalname, file.buffer, file.mimetype)
      );
    });

    return Promise.all(promises)
      .then(response => {
        return UsersDaoHandler.getCurrentUser(assert.getToken(request), response)
          .then(userInfo => {

            const images = [];
            response.forEach(image => {
              console.log('userId', userInfo.user.id);
              images.push({
                coverSource: image.Location,
                coverKey: image.key,
                userId: userInfo.user.id
              })
            });
            return ImagesDaoHandler.addUserImages(images);
          });
      })
  }


}

module.exports = AddUserImages;