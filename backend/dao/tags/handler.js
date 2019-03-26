'use strict';

const { Tags } = require('./../index');

class TagsDao {

  getAllTags() {
    return Tags.findAll({})
  }
}

module.exports = TagsDao;