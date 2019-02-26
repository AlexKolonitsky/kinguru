'use strict';

const _ = require('lodash');
const {Meetups, Speakers, MeetupsSpeakers} = require('./../index');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;
const firstIndex = 1;

/**
 * @description dashboard all meetups and search
 * @returns {Promise<any>}
 */

class MeetupDao {

  getAllMeetups(limit = 12, offset = 0, filter = {}, isRecent = false) {

    return Meetups.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'type', 'title', 'location', 'isFree', 'coverSource', 'date'],
      include: [{
        model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
        through: {attributes: []}
      }],
      where: filter,
    })
      .then(meetups => {
          let count = meetups.count;
          let filteredMeetups = meetups.rows;
          if (filteredMeetups.length === 0) {
            return Promise.reject(utils.responseError(404, `Meetup with type: ${filter.type} or  location: ${filter.location} not found`))
          }
          if (isRecent) {
            filteredMeetups = filteredMeetups.filter(meetup => new Date(meetup.date).getTime() < new Date().getTime());
            return Promise.resolve({filteredMeetups})
          }
          return Promise.resolve({filteredMeetups, count})
        }
      );
  }

  getCurrentMeetup(meetupId) {

    return Meetups.findOne({
      attributes: ['id', 'type', 'title', 'location', 'isFree', 'date', 'coverSource', 'coverKey'],
      include: [{
        model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
        through: {attributes: []}
      }],
      where: {
        id: meetupId
      }
    })
  }

  createMeetup(type, title, location, isFree, date, speakers, coverSource, coverKey) {

    let name = _.map(speakers, 'name');
    let surname = _.map(speakers, 'surname');

    return Promise.all([
      Meetups.findOrCreate({
        where: {
          title,
          type,
          location,
        },
        defaults: {
          isFree,
          date,
          coverSource,
          coverKey,
        }
      }),

      Speakers.findAll({
        where: {
          name,
          surname
        }
      })
    ])
      .then(result => {
        let meetup = result[zeroIndex][zeroIndex];
        let speakers = result[firstIndex];
        let speakerIds = _.map(speakers, 'id');

        return MeetupsSpeakers.findOrCreate({
          where: {
            meetupId: meetup.id,
            speakerId: speakerIds
          }
        })
          .then(() => {
            return this.getCurrentMeetup(meetup.id)
          })
      });
  }

  getFilter() {

    return Meetups.findAll({})
      .then(meetups => {
        let filterLocations = _.map(meetups, 'location');
        let filterTypes = _.map(meetups, 'type');

        let filterLocation = {};

        for (let i = 0; i < filterLocations.length; i++) {
          let city = filterLocations[i];
          filterLocation[city] = true;
        }
        let Locations = Object.keys(filterLocation);

        let filterType = {};

        for (let i = 0; i < filterTypes.length; i++) {
          let type = filterTypes[i];
          filterType[type] = true;
        }

        let Types = Object.keys(filterType);

        return ({Locations, Types})
      })
  }
}

module.exports = MeetupDao;