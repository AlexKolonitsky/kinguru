'use strict';

const { JobTitles } = require('./../index');

class JobTitlesDao {

  getAllJobTitles() {
    return JobTitles.findAll({})
  }
}

module.exports = JobTitlesDao;