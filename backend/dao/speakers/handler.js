'use strict';

const _ = require('lodash');
const { Speakers } = require('./../index');
const utils = require('../../common/securityAssert');

class SpeakersDao {

  getSpeaker(id) {
    return Speakers.findById(id)
  }

  getSpeakers(ids) {
    return Promise.all(_.map(ids, id => this.getSpeaker(id)))
  }

  addSpeaker (name, surname, email,) {

    return Speakers.findOrCreate({
      where: {
        name,
        surname
      },
      defaults: {
        email,
      }
    })
      .spread((speaker, created) => {
        console.log(speaker);
        if (created) {
            return Promise.reject(utils.responseError(410, `Speaker has already  created`))
        }
        return this.getSpeaker(speaker.id)
      })

  }

}

module.exports = SpeakersDao;