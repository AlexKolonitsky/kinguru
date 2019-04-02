'use strict';

const {Subscriptions} = require('./../index');
const nodemailer = require('./../../common/nodemailer');


class SubscriptionsDao {

  subscribe(email) {
    return Subscriptions.findOrCreate({
      where: {
        email: email
      },
    })
      .then(([user, created]) => {
          if (!created) {
            return Promise.reject({
              code: 4,
              message: `User with email: ${email} already signed`
            })
          }
          return nodemailer.sendMail(
            null,
            email,
            'KINGURU subscription',
            null,
            'Thank you for subscribing to Kinguru\'s news!',
          ).then(() => {
            return Promise.resolve(email);
          })
        }
      )
  }
}

module.exports = SubscriptionsDao;