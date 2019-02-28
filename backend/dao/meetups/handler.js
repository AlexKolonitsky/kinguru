'use strict';

const _ = require('lodash');
const {Meetups, Speakers, MeetupsSpeakers, Tags, MeetupsTags} = require('./../index');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;
const firstIndex = 1;
const secondIndex = 2;
const meetupAttributes = [
  'id', 'title', 'description', 'isOpen', 'maxGuestsCount', 'guestsCount',
  'rate', 'cost', 'coverSource', 'startDate', 'endDate', 'socialLink', 'commentsCount',
  'country', 'city', 'metro', 'typePlace'
];


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
          attributes: meetupAttributes,
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
      attributes: meetupAttributes,
      include: [{
        model: Speakers, as: 'speakers', attributes: ['name', 'surname'],
        through: {attributes: []}
      }],
      where: {
        id: meetupId
      }
    })
  }

  createMeetup(meetup) {
    meetup.tags = meetup.tags.split(',');
    console.log(meetup);
    let name = _.map(meetup.speakers, 'name');
    let surname = _.map(meetup.speakers, 'surname');

    return Promise.all([
      Meetups.findOrCreate({
        where: {
          title: meetup.title,
          city: meetup.city,
        },
        defaults: {
          starDate: meetup.startDate,
          endDate: meetup.endDate,
          coverSource: meetup.coverSource,
          coverKey: meetup.coverKey,
        }
      }),
      Tags.findOrCreate({
        where: {
          name: meetup.tags
        }
      }),
      Speakers.findAll({
        where: {
          name,
          surname
        }
      })
    ])
      .then(response => {
        let meetup = response[zeroIndex][zeroIndex];
        let tags = response[firstIndex];
        let speakers = response[secondIndex];
        let speakerIds = _.map(speakers, 'id');
        let tagIds = _.map(tags, 'id');

        return MeetupsSpeakers.findOrCreate({
          where: {
            meetupId: meetup.id,
            speakerId: speakerIds
          }
        })
          .then(() => {
            return MeetupsTags.findOrCreate({
              meetupId: meetup.id,
              tagId: tagIds
            })
              .then(() => {
                return this.getCurrentMeetup(meetup.id);
              })
          })
      });
  }

  getFilter() {
    return Promise.all([
      Meetups.findAll({}),

      Tags.findAll({})
    ])
      .then(result => {
        let filterLocations = _.map(result[zeroIndex], 'city');
        let Tags = result[firstIndex].map(tag => {
          return {
            id: tag.id,
            name: tag.name
          }
        });

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