'use strict';
const nodemailer = require('nodemailer');

function sendMail(from, to, subject, text, html) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noklen63@gmail.com',
      pass: '2wsxzaq1'
    }
  });
  console.log('=====================SEND============================');
  return transporter.sendMail({
    from: from || 'KINGURU <noklen63@gmail.com>',
    to: to,
    subject: subject,
    text: text,
    html: html
  });
  /*console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));*/
}

module.exports = {
  sendMail: sendMail
};