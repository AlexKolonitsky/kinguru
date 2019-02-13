'use strict';

const _ = require('lodash');
const { Meetups,  Speakers } = require('./../index');

/**
 * @returns {Promise<any>}
 */

class MeetupDao {

  getAllMeetups(limit = 20, offset = 0) {

    return Meetups.findAll({
      limit,
      offset,
      attributes: ['id', 'type', 'title', 'location', 'isFree', 'date'],
      include: [{
        model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
        through: { attributes: [] }
      }],
    })
      .then(allMeetups => Promise.resolve({ allMeetups }))
  }
}

module.exports = MeetupDao;