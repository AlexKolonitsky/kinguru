'use strict';

const _ = require('lodash');
const { Speakers } = require('./../index');
const utils = require('../../common/securityAssert');

class SpeakersDao {

  getSpeaker(id) {
    return Speakers.findById(id)
  }

/*  getSpeakers(ids) {
    return Promise.all(_.map(ids, id => this.getSpeaker(id)))
  }*/

  getAllSpeakers() {
    return Speakers.findAll({})
  }

  addSpeaker(speaker) {
    return Speakers.findOrCreate({
      where: {
        email: speaker.email
      },
      defaults: {
        name: speaker.name,
        surname: speaker.surname,
        coverSource: speaker.awsUrl,
        coverKey: speaker.awsKey
      }
    })
      .spread((speaker, created) => {
        if (created) {
          return this.getSpeaker(speaker.id);
        }
        return Promise.reject(utils.responseError(410, `Speaker has already created`));
      })

  }



}

module.exports = SpeakersDao;