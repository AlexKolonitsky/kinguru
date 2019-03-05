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
      where: {
        id: meetupId
      },
      attributes: meetupAttributes,
      include: [
        {
          model: Speakers, as: 'speakers', attributes: ['id', 'name', 'surname'],
          through: {attributes: []}
        },
        {
          model: Tags, as: 'tags', attributes: ['id', 'name'],
          through: {attributes: []}
        },
      ],
    })
  }

  createMeetup(meetup) {
    meetup.tags = meetup.tags.split(',');
    meetup.speakers = meetup.speakers.split(',');

    return Promise.all([
      Meetups.findOrCreate({
        where: {
          title: meetup.title,
          city: meetup.city,
        },
        defaults: {
          description: meetup.description,
          isOpen: meetup.isOpen,
          maxGuestsCount: meetup.maxGuestsCount,
          guestsCount: meetup.guestsCount,
          rate: meetup.rate,
          cost: meetup.cost,
          starDate: meetup.startDate,
          endDate: meetup.endDate,
          coverSource: meetup.coverSource,
          coverKey: meetup.coverKey,
          socialLink: meetup.socialLink,
          country: meetup.country,
          metro: meetup.metro,
          typePlace: meetup.typePlace,
          commentsCount: 0
        }
      }),
      Tags.findAll({
        where: {
          id: meetup.tags
        }
      }),
      Speakers.findAll({
        where: {
          id: meetup.speakers
        }
      })
    ])
      .then(response => {
        let meetup = response[zeroIndex][zeroIndex];
        let tagIds = _.map(response[firstIndex], 'id');
        let speakerIds = _.map(response[secondIndex], 'id');
        const promises = [];

        speakerIds.forEach(speakerId => {
          promises.push(MeetupsSpeakers.findOrCreate({
            where: {
              meetupId: meetup.id,
              speakerId: speakerId
            }
          }))
        });

        tagIds.forEach(tagId => {
          promises.push(MeetupsTags.findOrCreate({
            where: {
              meetupId: meetup.id,
              tagId: tagId
            }
          }))
        });

        return Promise.all(promises)
          .then(() => {
            return this.getCurrentMeetup(meetup.id);
          })
      })
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