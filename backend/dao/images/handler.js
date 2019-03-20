'use strict';

const {Images} = require('./../index');
const attributes = [
  'id', 'coverSource', 'coverKey',
];


/**
 * @description dashboard all images and search
 * @returns {Promise<any>}
 */

class ImagesDao {

  getMeetupImages(meetupId) {

    return Images.findAll({
      where: {
        meetupId: meetupId
      },
      attributes: attributes
    })
  }

  getLocationImages(locationId) {

    return Images.findAll({
      where: {
        locationId: locationId
      },
      attributes: attributes
    })
  }

  getUserImages(userId) {

    return Images.findAll({
      where: {
        userId: userId
      },
      attributes: attributes
    })
  }

  addImages(images) {
    const promises = [];
    images.forEach(image => {
      promises.push(Images.create({
        meetupId: image.meetupId,
        locationId: image.locationId,
        coverSource: image.coverSource,
        coverKey: image.coverKey,
      }))
    });
    return Promise.all(promises);
  }

  addUserImages(images) {
    const promises = [];
    images.forEach(image => {
      promises.push(Images.create({
        userId: image.userId,
        coverSource: image.coverSource,
        coverKey: image.coverKey,
      }))
    });
    return Promise.all(promises);
  }
}

module.exports = ImagesDao;