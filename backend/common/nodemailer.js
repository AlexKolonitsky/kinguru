'use strict';
const nodemailer = require('nodemailer');

function sendMail(from, to, subject, text, html) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noklen63@gmail.com',
      pass: '5288199Qazxsw'
    }
  });
  return transporter.sendMail({
    from: from || 'KINGURU <noklen63@gmail.com>',
    to: to,
    subject: subject,
    text: text,
    html: html
  });
}

module.exports = {
  sendMail: sendMail
};