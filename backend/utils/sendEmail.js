import "../config/env.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.verify();
  console.log("✅ SMTP verified");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

export default sendEmail;
