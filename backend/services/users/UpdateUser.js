'use strict';

const RequestHandler = require('./../../common/RequestHandler');
const validator = require('./../../common/validate');
const { UsersDaoHandler } = require('./../../dao/handlers');
const _ = require('lodash');
const utils = require('./../../common/securityAssert');
const assert = require('./../../common/assert');
const S3 = require('./../../common/S3');



class UpdateUser extends RequestHandler {

  constructor() {
    super();
    this.s3 = new S3();
  }

  validate(request) {
    const userRequest = request.body;
    return _.flatten([
      /*validator.fieldExist('firstname', userRequest.firstname),
      validator.fieldExist('lastname', userRequest.lastname),
      validator.fieldExist('gender', userRequest.gender),
      validator.fieldExist('country', userRequest.country),
      validator.fieldExist('birthday', userRequest.birthday),
      validator.fieldExist('phone', userRequest.phone),*/
    ]);

  }

  methodAction(request) {
    const userRequest = request.body;
    userRequest.languages = userRequest.languages ? userRequest.languages.split(',').map(language => parseInt(language, 10)) : null;
    userRequest.industries = userRequest.industries  ? userRequest.industries .split(',').map(jobTitle => parseInt(jobTitle, 10)) : null;
    userRequest.jobTitles = userRequest.jobTitles ? userRequest.jobTitles.split(',').map(jobTitle => parseInt(jobTitle, 10)) : null;
    userRequest.keywords = userRequest.keywords ? userRequest.keywords.split(',').map(keyword => parseInt(keyword, 10)) : null;
    userRequest.expertise = userRequest.expertise ? userRequest.expertise.split(',').map(keyword => parseInt(keyword, 10)) : null;
    const file = request.file;
    if (file) {
      return this.s3.upload(Date.now() + '-' + file.originalname, file.buffer, file.mimetype)
        .then(data => {
          userRequest.coverSource = data.Location;
          return UsersDaoHandler.updateUser(userRequest, assert.getToken(request))
            .then(userInfo => {
              return this.s3.deleteObject(userInfo.oldFileKey)
                .then(() => {
                  return {
                    user: userInfo.user,
                    token: userInfo.token
                  }
                });
            })
        })
    }
    return UsersDaoHandler.updateUser(userRequest, assert.getToken(request))
  }
}

module.exports = UpdateUser;
