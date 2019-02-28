'use strict';

const _ = require('lodash');
const {Meetups, Speakers, MeetupsSpeakers, Tags, MeetupsTags} = require('./../index');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;
const firstIndex = 1;

/**
 * @description dashboard all meetups and search
 * @returns {Promise<any>}
 */

class MeetupDao {

  getAllMeetups(limit = 12, offset = 0, filter = {}, tags = [], isRecent = false) {

    return MeetupsTags.findAll({
      where: {
        tagId: tags
      }
    })
      .then(meetupsTags => {
        filter.id = _.map(meetupsTags, 'meetupId');
        if (tags.length === 0) {
          delete filter.id;
        }
        return Meetups.findAndCountAll({
          limit,
          offset,
          attributes: [
            'id', 'title', 'description', 'isOpen', 'maxGuestsCount', 'guestsCount',
            'rate', 'cost', 'coverSource', 'startDate', 'endDate', 'socialLink', 'commentsCount',
            'country', 'city', 'metro', 'typePlace'
          ],
          include: [
            {
              model: Speakers, as: 'speakers', attributes: ['id', 'name', 'surname'],
              through: {attributes: []}
            },
            {
              model: Tags, as: 'tags', attributes: ['id', 'name'],
              through: {attributes: []}
            }],

          where: filter,
        })
          .then(meetupsResponse => {
            const meetups = meetupsResponse.rows;
            let filteredMeetups = meetups;
            let meetupsCount = meetupsResponse.count;
            if (filteredMeetups.length === 0) {
              return Promise.reject(utils.responseError(404, `Meetup with location: ${filter.location} or  with: id ${filter.id} not found`))
            }
            if (isRecent) {
              filteredMeetups = filteredMeetups.filter(meetup => new Date(meetup.date).getTime() < new Date().getTime());
              return Promise.resolve({filteredMeetups})
            }
            return Promise.resolve({filteredMeetups, meetupsCount})
          })
      });
  }

  getCurrentMeetup(meetupId) {

    return Meetups.findOne({
      attributes: ['id', 'title', 'location', 'isFree', 'date', 'coverSource', 'coverKey'],
      include: [{
        model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
        through: {attributes: []}
      }],
      where: {
        id: meetupId
      }
    })
  }

  createMeetup(type, title, location, date, speakers, coverSource, coverKey) {

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
    return Promise.all([
      Meetups.findAll({}),

      Tags.findAll({})
    ])
      .then(result => {
        let meetups = result[zeroIndex];
        let tags = result[firstIndex];
        let filterLocations = _.map(meetups, 'city');
        let Tags = _.map(tags, 'name');

        let filterLocation = {};
        for (let i = 0; i < filterLocations.length; i++) {
          let city = filterLocations[i];
          filterLocation[city] = true;
        }
        let Locations = Object.keys(filterLocation);
        return ({Locations, Tags})
      })
  }
}

module.exports = MeetupDao;