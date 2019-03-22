'use strict';

const _ = require('lodash');
const Sequelize = require('sequelize');
const {Meetups, Speakers, MeetupsSpeakers, Tags, MeetupsTags, Locations, Users} = require('./../index');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;
const firstIndex = 1;
const secondIndex = 2;
const attributes = {
  meetup: [
    'id', 'title', 'description', 'isOpen', 'maxGuestsCount', 'guestsCount',
    'cost', 'coverSource', 'startDate', 'endDate', 'socialLink', 'commentsCount',
    'locationId'
  ],
  speaker: ['id', 'firstname', 'lastname', 'coverSource'],
  tag: ['id', 'name']
};


/**
 * @description dashboard all meetups and search
 * @returns {Promise<any>}
 */

class MeetupDao {

  getAllMeetups(limit = 12, offset = 0, tags = [], cities = [], isRecent = false) {

    return Promise.all([
      MeetupsTags.findAll({
        where: {
          tagId: tags
        }
      }),
      Locations.findAll({
        where: {
          city: cities
        }
      })
    ])
      .then(response => {
        const meetupsTagsFilter = _.map(response[zeroIndex], 'meetupId');
        const locationsFilter = _.map(response[firstIndex], 'id');
        return Meetups.findAll({
          where: {
            [Sequelize.Op.and]: [
              meetupsTagsFilter.length ? {id: meetupsTagsFilter} : {},
              locationsFilter.length ? {locationId: locationsFilter} : {}
            ]
          },
          attributes: attributes.meetup,
          include: [
            {
              model: Users, as: 'speakers', attributes: attributes.speaker,
              through: {attributes: []}
            },
            {
              model: Users, as: 'guests', attributes: attributes.speaker,
              through: {attributes: []}
            },
            {
              model: Tags, as: 'tags', attributes: attributes.tag,
              through: {attributes: []}
            }],
        })
          .then(filteredMeetups => {
            filteredMeetups = filteredMeetups.filter(meetup => meetup.isOpen);
            if (filteredMeetups.length === 0) {
              return Promise.reject(utils.responseError(404, `Meetups not found`))
            }
            if (isRecent) {
              filteredMeetups = filteredMeetups
                .filter(meetup => new Date(meetup.endDate).getTime() < new Date().getTime());
              return {
                filteredMeetups: filteredMeetups.slice(offset, offset + limit)
              }
            }
            filteredMeetups = filteredMeetups
              .filter(meetup => new Date(meetup.endDate).getTime() >= new Date().getTime());
            return {
              filteredMeetups: filteredMeetups.slice(offset, offset + limit),
              meetupsCount: filteredMeetups.length
            }
          });
      });
  }

  getCurrentMeetup(meetupId) {

    return Meetups.findOne({
      where: {
        id: meetupId
      },
      attributes: attributes.meetup,
      include: [
        {
          model: Users, as: 'speakers', attributes: attributes.speaker,
          through: {attributes: []}
        },
        {
          model: Users, as: 'guests', attributes: attributes.speaker,
          through: {attributes: []}
        },
        {
          model: Tags, as: 'tags', attributes: attributes.tag,
          through: {attributes: []}
        },
      ],
    })
      .then(meetup => {
        return Locations.findOne({
          where: {
            id: meetup.locationId
          }
        })
          .then(location => {
            meetup = meetup.dataValues;
            meetup.location = location.dataValues;
            return meetup;
          })
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
      Users.findAll({
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
      Locations.findAll({}),
      Tags.findAll({})
    ])
      .then(result => {
        let filterLocations = _.map(result[zeroIndex], 'city');
        let tags = result[firstIndex]
          .map(tag => {
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
        let locations = Object.keys(filterLocation);
        return ({locations, tags})
      })
  }
}

module.exports = MeetupDao;