const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmailWithAttachment = async (to, subject, text, filePath) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [{ filename: 'result.pdf', path: filePath }],
  });
};

exports.sendPlainEmail = async (to, subject, text) => {
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
};