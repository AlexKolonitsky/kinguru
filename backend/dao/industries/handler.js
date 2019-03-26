'use strict';

const { Industries } = require('./../index');

class IndustriesDao {

  getAllIndustries() {
    return Industries.findAll({})
  }
}

module.exports = IndustriesDao;