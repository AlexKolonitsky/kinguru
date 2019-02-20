'use strict';

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const size = 1024 * 1024 * 5;
require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
});

let s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


let upload = multer({
  storage: multerS3({
    s3,
    bucket: 'kinguru-images',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
  limits: size,
  fileFilter,
});

module.exports = upload;