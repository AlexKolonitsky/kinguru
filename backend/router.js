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


/**
 * @description Meetups endpoints
 */

const meetups = require('./services/meetups/index');
router.get('/meetups',(req, res, next) =>meetups.GetMeetups.process(req, res, next));


/**
 * @description Files endpoints
 */

const file = require('./services/files');
router.post('/file/upload', upload.fields([
  { name: 'cover', maxCount: 1 },
]), (req, res, next) => file.UploadFile.process(req, res, next));
router.delete('/file/upload/:fileId', (req, res, next) => file.DeleteFile.process(req, res, next));

module.exports = router;