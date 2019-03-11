'use strict';

const _ = require('lodash');
const {Comments} = require('./../index');
const UsersHandler = require('./../users/handler');
const commentAttributes = [
  'id', 'text', 'rate', 'userId'
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
