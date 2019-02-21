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

  addSpeaker(email, name, surname, awsUrl, awsKey) {

    return Speakers.findOrCreate({
      where: {
        name,
        surname
      },
      defaults: {
        email,
        coverSource: awsUrl,
        key: awsKey
      }
    })
      .spread((speaker, created) => {
        if (created) {
          return this.getSpeaker(speaker.id)
        }
        return Promise.reject(utils.responseError(410, `Speaker has already  created`))

      })

  }



}

module.exports = SpeakersDao;