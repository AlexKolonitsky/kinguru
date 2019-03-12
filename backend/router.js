'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

/**
 * @description Users endpoints
 */

const users = require('./services/users/index');
router.post('/user/register', (req, res, next) => users.RegistrationUser.process(req, res, next));
router.post('/user/login', (req, res, next) => users.LoginUser.process(req, res, next));
router.get('/user/current', (req, res, next) => users.GetCurrentUser.process(req, res, next, true));
router.post('/user/change/password', (req, res, next) => users.ChangePassword.process(req, res, next, true));


/**
 * @description Meetups endpoints
 */

const meetups = require('./services/meetups/index');
router.post('/meetups', (req, res, next) => meetups.GetAllMeetups.process(req, res, next));
router.get('/meetup/:id', (req, res, next) => meetups.GetCurrentMeetup.process(req, res, next));
router.post('/new/meetup', upload.single('image'), (req, res, next) => meetups.CreateMeetup.process(req, res, next, true));
router.delete('/meetup/:id', (req,res, next) => meetups.RemoveMeetup.process(req,res, next));
router.get('/filter/meetup', (req, res, next) => meetups.GetFilter.process(req, res, next));

/**
 * @description Speakers endpoints
 */

const speakers = require('./services/speakers/index');
router.post('/new/speaker', upload.single('image'),(req, res, next) => speakers.AddSpeaker.process(req, res, next));
router.get('/speakers', (req, res, next) => speakers.GetAllSpeakers.process(req, res, next));
router.delete('/speaker/:id', (req,res, next) => speakers.RemoveSpeaker.process(req, res, next));

/**
 * @description Locations endpoints
 */

const locations = require('./services/locations/index');
router.get('/locations', (req, res, next) => locations.GetAllLocations.process(req, res, next));
router.get('/location/:id', (req, res, next) => locations.GetCurrentLocation.process(req, res, next));
/*router.get('/speakers', (req, res, next) => speakers.GetAllSpeakers.process(req, res, next));
router.delete('/speaker/:id', (req,res, next) => speakers.RemoveSpeaker.process(req, res, next));*/

/**
 * @description Comments endpoints
 */

const comments = require('./services/comments/index');
router.get('/meetup/:meetupId/comments', (req, res, next) => comments.GetMeetupComments.process(req, res, next));
router.get('/speaker/:speakerId/comments', (req, res, next) => comments.GetSpeakerComments.process(req, res, next));
router.get('/location/:locationId/comments', (req, res, next) => comments.GetLocationComments.process(req, res, next));
router.post('/comment', (req, res, next) => comments.CreateComment.process(req, res, next, true));



module.exports = router;