'use strict';

const _ = require('lodash');
const {Comments} = require('./../index');
const utils = require('./../../common/securityAssert');
const commentAttributes = [
  'id', 'text', 'rate'
];


class CommentsDao {

  getMeetupComments(meetupId) {

    return Comments.findAll({
      where: {
        meetupId: meetupId
      },
      attributes: commentAttributes
    });
  }

  getSpeakerComments(speakerId) {
    return Comments.findAll({
      where: {
        speakerId: speakerId
      },
      attributes: commentAttributes
    })
  }

  getLocationComments(locationId) {
    return Comments.findAll({
      where: {
        locationId: locationId
      },
      attributes: commentAttributes
    })
  }
}

module.exports = CommentsDao;
