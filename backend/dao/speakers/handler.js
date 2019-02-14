'use strict';

const _ = require('lodash');
const { Speakers } = require('./../index');

class SpeakersDao {

  getSpeaker(id) {
    return Speakers.findById(id)
  }

  getSpeakers(ids) {
    return Promise.all(_.map(ids, id => this.getSpeaker(id)))
  }

}

module.exports = SpeakersDao;