'use strict';

const { Tags } = require('./../index');

class TagsDao {

  getAllTags(filter = {}) {
    return Tags.findAll({
      where: filter
    })
  }
}

module.exports = TagsDao;