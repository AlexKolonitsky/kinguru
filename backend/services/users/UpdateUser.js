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
      validator.fieldExist('first name', userRequest.firstname),
      validator.fieldExist('last name', userRequest.lastname),
      validator.fieldExist('gender', userRequest.gender),
      validator.fieldExist('country', userRequest.country),
      validator.fieldExist('birthday', userRequest.birthday),
      validator.fieldExist('phone number', userRequest.phone),
    ]);

  }

  methodAction(request, response) {
    const userRequest = request.body;
    const file = request.file;
    if (file) {
      return this.s3.upload(Date.now() + '-' + file.originalname, file.buffer, file.mimetype)
        .then(data => {
          console.log(data);
          userRequest.coverSource = data.Location;
          userRequest.coverKey = data.key;
          return UsersDaoHandler.updateUser(userRequest, assert.getToken(request), response)
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
    return UsersDaoHandler.updateUser(userRequest, assert.getToken(request), response)
  }
}

module.exports = UpdateUser;