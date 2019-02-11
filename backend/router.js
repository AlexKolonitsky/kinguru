'use strict';

const express = require('express');
const router = express.Router();
const { UsersDaoHandler } = require('./dao/handlers');

router.post('/user/register', (req, res) => UsersDaoHandler.createUser(req, res));


module.exports = router;