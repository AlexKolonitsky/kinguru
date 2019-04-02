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
router.post('/user/update', upload.single('image'), (req, res, next) => users.UpdateUser.process(req, res, next, true));
router.post('/user/change/password', (req, res, next) => users.ChangePassword.process(req, res, next, true));
router.get('/user/confirmation/:id', (req, res, next) => users.ConfirmEmail.process(req, res, next));
router.post('/new/speaker', upload.single('image'),  (req, res, next) => users.CreateSpeaker.process(req, res, next, true));
router.post('/speakers', (req, res, next) => users.GetSpeakers.process(req, res, next));
router.post('/guests', (req, res, next) => users.GetGuests.process(req, res, next));


/**
 * @description Meetups endpoints
 */

const meetups = require('./services/meetups/index');
router.post('/meetups', (req, res, next) => meetups.GetAllMeetups.process(req, res, next));
router.get('/meetup/:id', (req, res, next) => meetups.GetCurrentMeetup.process(req, res, next));
router.post('/new/meetup', upload.single('image'), (req, res, next) => meetups.CreateMeetup.process(req, res, next, true));
router.delete('/meetup/:id', (req,res, next) => meetups.RemoveMeetup.process(req,res, next));
router.get('/filter/meetup', (req, res, next) => meetups.GetFilter.process(req, res, next));
router.post('/meetup/add/guests', (req, res, next) => meetups.AddGuestsToMeetup.process(req, res, next));

/**
 * @description Speakers endpoints
 */

/*
const speakers = require('./services/speakers/index');
router.post('/new/speaker', upload.single('image'),(req, res, next) => speakers.AddSpeaker.process(req, res, next));
router.get('/speakers', (req, res, next) => speakers.GetAllSpeakers.process(req, res, next));
router.delete('/speaker/:id', (req,res, next) => speakers.RemoveSpeaker.process(req, res, next));
*/

/**
 * @description Locations endpoints
 */

const locations = require('./services/locations/index');
router.get('/locations', (req, res, next) => locations.GetAllLocations.process(req, res, next));
router.get('/location/:id', (req, res, next) => locations.GetCurrentLocation.process(req, res, next));

/**
 * @description Comments endpoints
 */

const comments = require('./services/comments/index');
router.get('/meetup/:meetupId/comments', (req, res, next) => comments.GetMeetupComments.process(req, res, next));
router.get('/speaker/:speakerId/comments', (req, res, next) => comments.GetSpeakerComments.process(req, res, next));
router.get('/location/:locationId/comments', (req, res, next) => comments.GetLocationComments.process(req, res, next));
router.post('/comment', (req, res, next) => comments.CreateComment.process(req, res, next, true));
router.get('/speaker/:speakerId/rate', (req, res, next) => comments.GetSpeakerRate.process(req, res, next));

/**
 * @description Tags endpoints
 */

const tags = require('./services/tags/index');
router.get('/tags', (req, res, next) => tags.GetAllTags.process(req, res, next));

/**
 * @description job titles endpoints
 */

const jobtitles = require('./services/jobtitles/index');
router.get('/job/titles', (req, res, next) => jobtitles.GetAllJobTitles.process(req, res, next));

/**
 * @description industries endpoints
 */

const industries = require('./services/industries/index');
router.get('/industries', (req, res, next) => industries.GetAllIndustries.process(req, res, next));

/**
 * @description expertises, interests endpoints
 */

const wordkeys = require('./services/wordkeys/index');
router.get('/wordkeys', (req, res, next) => wordkeys.GetAllWordKeys.process(req, res, next));

/**
 * @description Languages endpoints
 */

const languages = require('./services/languages/index');
router.get('/languages', (req, res, next) => languages.GetAllLanguages.process(req, res, next));

/**
 * @description Subscriptions endpoints
 */

const subscriptions = require('./services/subscriptions/index');
router.get('/subscribe/:email', (req, res, next) => subscriptions.Subscribe.process(req, res, next));



/**
 * @description Images endpoints
 */

const images = require('./services/images/index');
router.post('/images/add/user/galery', upload.array('images'), (req, res, next) => images.AddUserImages.process(req, res, next, true));
router.post('/images/add', upload.array('images'), (req, res, next) => images.AddImages.process(req, res, next, true));
router.get('/images/meetup/:id', (req, res, next) => images.GetMeetupImages.process(req, res, next));
router.get('/images/location/:id', (req, res, next) => images.GetLocationImages.process(req, res, next));
router.get('/images/user/:id', (req, res, next) => images.GetUserImages.process(req, res, next));

module.exports = router;
