'use strict';

const _ = require('lodash');
const {Locations} = require('./../index');
const utils = require('./../../common/securityAssert');
const locationAttributes = [
  'id', 'country', 'state', 'city', 'address', 'metro', 'place', 'email', 'phone', 'zipCode', 'coverSource', 'coverKey'
];


/**
 * @description dashboard all meetups and search
 * @returns {Promise<any>}
 */

class LocationDao {

  getAllLocations() {

    return Locations.findAll({
      attributes: locationAttributes
    });
  }

  getCurrentLocation(locationId) {
    return Locations.findOne({
      where: {
        id: locationId
      },
      attributes: locationAttributes
    })
  }
}

module.exports = LocationDao;