'use strict';

const _ = require('lodash');
const Sequelize = require('sequelize');
const {Meetups, MeetupsSpeakers, Tags, MeetupsTags, Locations, Users, MeetupsGuests} = require('./../index');
const utils = require('./../../common/securityAssert');
const zeroIndex = 0;
const firstIndex = 1;
const secondIndex = 2;
const thirdIndex = 3;
const attributes = {
  meetup: [
    'id', 'title', 'description', 'isOpen', 'maxGuestsCount',
    'cost', 'coverSource', 'startDate', 'endDate', 'socialLink',
    'locationId'
  ],
  user: ['id', 'firstname', 'lastname', 'coverSource'],
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
              model: Users, as: 'speakers', attributes: attributes.user,
              through: {attributes: []}
            },
            {
              model: Users, as: 'guests', attributes: attributes.user,
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
          model: Users, as: 'speakers', attributes: attributes.user,
          through: {attributes: []}
        },
        {
          model: Users, as: 'guests', attributes: attributes.user,
          through: {attributes: []}
        },
        {
          model: Tags, as: 'tags', attributes: attributes.tag,
          through: {attributes: []}
        },
      ],
    })
      .then(meetup => {
        if (!meetup) {
          return Promise.reject({
            code: 403,
            message: `Meetup with such id ${meetupId} not found`
          })
        }
        if (!meetup.locationId) {
          return meetup;
        }
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

    return Promise.all([
      Meetups.findOrCreate({
        where: {
          title: meetup.title
        },
        defaults: {
          description: meetup.description,
          isOpen: meetup.isOpen,
          maxGuestsCount: meetup.maxGuestsCount,
          cost: meetup.cost,
          startDate: meetup.startDate,
          endDate: meetup.endDate,
          coverSource: meetup.coverSource,
          coverKey: meetup.coverKey,
          socialLink: meetup.socialLink,
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
      }),
      Users.findAll({
        where: {
          id: meetup.guests
        }
      })
    ])
      .then(response => {
        let responseMeetup = response[zeroIndex][zeroIndex];
        let tagIds = _.map(response[firstIndex], 'id');
        let speakerIds = _.map(response[secondIndex], 'id');
        let guestIds = _.map(response[thirdIndex], 'id');
        const promises = [];

        speakerIds.forEach(speakerId => {
          promises.push(MeetupsSpeakers.findOrCreate({
            where: {
              meetupId: responseMeetup.id,
              speakerId: speakerId
            }
          }))
        });

        tagIds.forEach(tagId => {
          promises.push(MeetupsTags.findOrCreate({
            where: {
              meetupId: responseMeetup.id,
              tagId: tagId
            }
          }))
        });

        guestIds.forEach(guestId => {
          promises.push(MeetupsGuests.findOrCreate({
            where: {
              meetupId: responseMeetup.id,
              guestId: guestId
            }
          }))
        });

        return Promise.all(promises)
          .then(() => {
            if (meetup.country || meetup.city || meetup.place) {
              return Locations.findOrCreate({
                where: {
                  country: meetup.country,
                  city: meetup.city,
                  place: meetup.place
                }
              })
                .then(() => {
                  return this.getCurrentMeetup(responseMeetup.id);
                })
            }
            return this.getCurrentMeetup(responseMeetup.id);
          })
      })
  }

  addGuestsToMeetup(meetupId, guests = []) {
    const promises = [];
    guests.forEach(guest => {
      promises.push(
        MeetupsGuests.findOrCreate({
          where: {
            meetupId: meetupId,
            guestId: guest
          }
        }))
    });
    return Promise.all(promises)
      .then(() => {
        return this.getCurrentMeetup(meetupId);
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