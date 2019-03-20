'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const {ImagesDaoHandler} = require('../../dao/handlers');
const S3 = require('./../../common/S3');

class AddImages extends RequestHandlers {

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
        const images = [];
        response.forEach(image => {
          images.push({
            coverSource: image.Location,
            coverKey: image.key,
            locationId: request.body.locationId,
            meetupId: request.body.meetupId
          })
        });
        return ImagesDaoHandler.addImages(images);
      });
  }


}

module.exports = AddImages;