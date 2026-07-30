import "../config/env.js";
import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

const sendEmail = async (to, subject, html) => {
  await apiInstance.sendTransacEmail({
    sender: {
      name: "BigFree FX",
      email: process.env.EMAIL_USER,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

export default sendEmail;
