const nodemailer = require("nodemailer");

//! email service config
const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "aligrd133@gmail.com",
    pass: "xaam lawz rbhz vjbx ",
  },
};
//! nodemailer function
const sendMail = (data) => {
  const transporter = nodemailer.createTransport(config);

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`mail service response :`, info.response);
      return info.response;
    }
  });
};

module.exports = sendMail;
