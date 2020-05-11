import nodemailer from "nodemailer";
import * as config from "../config/email";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailAddress,
    pass: config.emailPassword,
  },
});

const mailOptions = {
  from: config.emailAddress,
  subject: "[ART'CADE - CAMPAGNE SIMULATOR]",
};

export async function sendVerificationCode(emailAddress, code) {
  try {
    const options = {
      ...mailOptions,
      to: emailAddress,
      html: `<p>Your verification code is <bold>${code}</bold></p>`,
    };
    await transporter.sendMail(options);
  } catch (err) {
    console.log(`GMAIL ERROR : ${JSON.stringify(err)}`);
    throw new Error("Could not send verification code");
  }
}
