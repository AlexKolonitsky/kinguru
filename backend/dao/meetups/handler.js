'use strict';

const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Meetups, Speakers } = require('./../index');

/**
 * @returns {Promise<any>}
 */

class MeetupDao {

  getAllMeetups(limit = 20, offset = 0, location, type) {

     if(location) {
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
         .then(allMeetups => Promise.resolve({ allMeetups }))
     }

     if (type){
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
         .then(allMeetups => Promise.resolve({ allMeetups }))
     }

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
         .then(allMeetups => Promise.resolve({ allMeetups }))
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
}

module.exports = MeetupDao;