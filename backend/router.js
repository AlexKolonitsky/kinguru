'use strict';

const express = require('express');
const router = express.Router();
const { UsersDaoHandler } = require('./dao/handlers');

/**
 * @description Users endpoints
 */

const users = require('./services/users');
router.post('/user/register', (req, res, next) => users.RegistrationUser.process(req, res, next));


module.exports = router;