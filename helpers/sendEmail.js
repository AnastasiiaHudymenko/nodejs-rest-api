const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_KEY } = process.env;

const nodemailerConfig = {
  service: "Gmail",
  auth: {
    user: "anastasiasavchenko0704@gmail.com",
    pass: GMAIL_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { from: "anastasiasavchenko0704@gmail.com", ...data };

  try {
    await transport.sendMail(email);
    console.log("Succsess");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = sendEmail;
