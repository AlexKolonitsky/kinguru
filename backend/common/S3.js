'use strict';

const AWS = require('aws-sdk');
require('dotenv').config();

const configAws = {
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.REGION,
};

/**
 * @class S3 is used to provide work with AWS for images, files
 */

class S3 {

  constructor() {
    AWS.config.update(configAws);
    this.s3 = new AWS.S3({})
  }

  upload(filename, data, contentType) {

    let params = {
      Bucket: 'kinguru-images',
      ACL: 'public-read',
      Key: filename,
      Body: data,
      ContentType: contentType,
    };

    return new Promise((resolve, reject) => {

      this.s3.upload(params, (err, data) => {
        if (err) {
          console.log('Upload error to S3', err);
          return reject(err)
        }
        resolve(data);
      })
    })
  }

  deleteObject(key) {

    let params = {
      Bucket: 'kinguru-images',
      Key: key
    };

    return new Promise((resolve, reject) => {

      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log('Delete error to S3', err);
          return reject(err)
        }
        resolve(data)
      });
    });
  }

}

module.exports = S3;