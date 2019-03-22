'use strict';
const nodemailer = require('nodemailer');

function sendMail(from, to, subject, text, html, hostname) {

  const transporter = nodemailer.createTransport({
    host: hostname || 'localhost',
    port: 3010,
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