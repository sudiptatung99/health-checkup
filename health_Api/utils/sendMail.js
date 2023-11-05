
const nodemailer = require("nodemailer");
exports.sendEmail = async (email, otp) => {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.pass
      },
    })
    await transport.sendMail({
      from: process.env.email,
      to: email,
      subject: "Account Verification",
      text: "password verification",
      html: `<h4>password verification code : <h4><h2>${otp}</h2> <h5>OTP expired within 2 minutes</h5>`,
  })
  
  }