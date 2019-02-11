'use strict';

const { Users } = require('./../index');

class UsersDao {

  createUser(userInfo) {

    let email = utils.encrypt(userInfo.email);

    return Users.findOne({where: {email: email}})
      .then(user => {
        if (!user) {
          return Users.create(userInfo);
        }

        return Promise.reject({code: ERRORS_CODE.DUPLICATE});
      });
  }

}

module.exports = UsersDao;