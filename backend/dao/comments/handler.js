'use strict';

const {Comments} = require('./../index');
const UsersHandler = require('./../users/handler');
const assert = require('./../../common/assert');
const securityAssert = require('./../../common/securityAssert');
const commentAttributes = [
  'id', 'text', 'rate', 'userId', 'createdAt', 'updatedAt'
];


class CommentsDao {

  getMeetupComments(meetupId) {

    return Comments.findAll({
      where: {
        meetupId: meetupId
      },
      attributes: commentAttributes
    })
      .then(comments => {
        return this.mapResponseComments(comments);
      })
  }

  getSpeakerComments(speakerId) {
    return Comments.findAll({
      where: {
        speakerId: speakerId
      },
      attributes: commentAttributes
    })
      .then(comments => {
        return this.mapResponseComments(comments);
      })
  }

  getLocationComments(locationId) {
    return Comments.findAll({
      where: {
        locationId: locationId
      },
      attributes: commentAttributes
    })
      .then(comments => {
        return this.mapResponseComments(comments);
      })
  }

  createComment(request) {
    const comment = request.body;
    const user = securityAssert.getUserByToken(assert.getToken(request)).user;
    console.log(user.id);
    return Comments.findOrCreate({
      where: {
        id: comment.id,
      },
      defaults: {
        text: comment.text,
        rate: comment.rate,
        meetupId: comment.meetupId,
        speakerId: comment.speakerId,
        locationId: comment.locationId,
        userId: user.id
      }
    })
      .spread((comment, created) => {
        if (created) {
          return comment;
        }
      })
  }

  mapResponseComments(comments) {
    const usersDao = new UsersHandler();
    const promises = [];
    comments.forEach(comment => {
      promises.push(usersDao.getUserById(comment.dataValues.userId));
    });
    return Promise.all(promises)
      .then(users => {
        return comments.map((comment, index) => {
          comment.dataValues.user = users[index];
          delete comment.dataValues.userId;
          return comment.dataValues;
        })
      })
  }
}

module.exports = CommentsDao;
