'use strict';

const express = require('express');
const router = express.Router();
const upload = require('./common/multer');

/**
 * @description Users endpoints
 */

const users = require('./services/users/index');
router.post('/user/register', (req, res, next) => users.RegistrationUser.process(req, res, next));


/**
 * @description Meetups endpoints
 */

const meetups = require('./services/meetups/index');
router.get('/meetups', (req, res, next) => meetups.GetAllMeetups.process(req, res, next));
router.get('/meetup/:id', (req, res, next) => meetups.GetCurrentMeetup.process(req, res, next));
router.post('/new/meetup', upload.single('meetupImage'), (req, res, next) => meetups.CreateMeetup.process(req, res, next));

/**
 * @description Files endpoints
 */


module.exports = router;