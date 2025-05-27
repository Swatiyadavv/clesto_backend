
  require("dotenv").config();
const nodemailer = require("nodemailer");

function otp(n) {
  let otp = "";
  for (let index = 0; index < n; index++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // for TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sentOtp = async (email, otp) => {
  try {
    const data = await transporter.sendMail({
      from: `"OTP Service" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<b>Your OTP is:</b><br><h1>${otp}</h1>`,
    });
    console.log("Email sent: ", data.response);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

module.exports = { otp, sentOtp };
