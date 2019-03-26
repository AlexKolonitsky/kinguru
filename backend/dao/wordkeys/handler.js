'use strict';

const { WordKeys } = require('./../index');

class WordKeysDao {

  getAllWordKeys() {
    return WordKeys.findAll({})
  }
}

module.exports = WordKeysDao;