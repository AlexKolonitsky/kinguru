'use strict';

const {Languages} = require('./../index');
const languageAttributes = [
  'id', 'name'
];


class LanguageDao {

  getAllLanguages() {

    return Languages.findAll({
      attributes: languageAttributes
    });
  }
}

module.exports = LanguageDao;