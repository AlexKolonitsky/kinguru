'use strict';
const nodemailer = require('nodemailer');

function sendMail(from, to, subject, text, html) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  return transporter.sendMail({
    from: from || `KINGURU <${process.env.GMAIL_USER}>`,
    to: to,
    subject: subject,
    text: text,
    html: html
  });
}

module.exports = {
  sendMail: sendMail
};