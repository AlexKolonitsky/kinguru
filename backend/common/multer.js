'use strict';

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const size = 1024*1024*5;

aws.config.update({
  secretAccessKey: '0gvGT8eOzYHMbrPJzmLHethdRdvuM1iDwuHfhTCc',
  accessKeyId: 'AKIAIHHJQUADFGKGUPKQ',
  region: 'eu-west-1'
});

let s3 = new aws.S3({});

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
    metadata:(req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
  limits: size,
  fileFilter,
});

module.exports = upload;