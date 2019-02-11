'use strict';

const UsersHandler = require('./users/handler');

module.exports = {
  UsersDaoHandler: new UsersHandler(),
};