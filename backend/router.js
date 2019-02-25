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


/**
 * @description Meetups endpoints
 */

const meetups = require('./services/meetups/index');
router.get('/meetups', (req, res, next) => meetups.GetAllMeetups.process(req, res, next));
router.get('/meetup/:id', (req, res, next) => meetups.GetCurrentMeetup.process(req, res, next));
router.post('/new/meetup', upload.single('image'), (req, res, next) => meetups.CreateMeetup.process(req, res, next));
router.delete('/meetup/:id', (req,res, next) => meetups.RemoveMeetup.process(req,res, next));
router.get('/filter/meetup', (req, res, next) => meetups.GetFilter.process(req, res, next));

/**
 * @description Speakers endpoints
 */

const speakers = require('./services/speakers/index');
router.post('/new/speaker', upload.single('image'),(req, res, next) => speakers.AddSpeaker.process(req, res, next));
router.delete('/speaker/:id', (req,res, next) => speakers.RemoveSpeaker.process(req, res, next));

module.exports = router;