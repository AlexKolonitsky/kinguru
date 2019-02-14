'use strict';

const _ = require('lodash');
const { Meetups, Speakers } = require('./../index');
const utils = require('./../../common/securityAssert');

/**
 * @description dashboard all meetups and search
 * @returns {Promise<any>}
 */

class MeetupDao {

  getAllMeetups(limit = 12, offset = 0, location, type) {

    if (type && location) {
      return Meetups.findAll({
        limit,
        offset,
        attributes: ['id', 'type', 'title', 'location', 'isFree', 'date'],
        include: [{
          model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
          through: { attributes: [] }
        }],
        where: {
          type,
          location
        }
      })
        .then(allMeetups => {
          if (!allMeetups[0]) {
            return Promise.reject(utils.responseError(404, `Meetup with ${type} in ${location} not found`))
          }
           return  Promise.resolve({ allMeetups })
          }
        )
    }

    if (location) {
      return Meetups.findAll({
        limit,
        offset,
        attributes: ['id', 'type', 'title', 'location', 'isFree', 'date'],
        include: [{
          model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
          through: { attributes: [] }
        }],
        where: {
          location,
        }
      })
        .then(allMeetups => {
          if (!allMeetups[0]) {
            return Promise.reject(utils.responseError(404, `Meetup in ${location} not found`))
          }
          return Promise.resolve({ allMeetups })
        })
    }

    if (type) {
      return Meetups.findAll({
        limit,
        offset,
        attributes: ['id', 'type', 'title', 'location', 'isFree', 'date'],
        include: [{
          model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
          through: { attributes: [] }
        }],
        where: {
          type,
        }
      })
        .then(allMeetups => {
          if (!allMeetups[0]) {
            return Promise.reject(utils.responseError(404, `Meetup ${type} not found`))
          }
          return Promise.resolve({ allMeetups })
        })
    }

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

  getCurrentMeetup(meetupId) {

    return Meetups.findOne({
      attributes: ['id', 'type', 'title', 'location', 'isFree', 'date'],
      include: [{
        model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
        through: { attributes: [] }
      }],
      where: {
        id: meetupId
      }
    })
  }
}

module.exports = MeetupDao;