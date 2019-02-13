'use strict';

const { Meetups } = require('./../index');

class MeetupDao {

  getMeetups(limit = 20, offset = 0) {

    return Meetups.findAll({
      limit,
      offset
    })
      .then(meetups => {
        return meetups
      })

  }

}

module.exports = MeetupDao;