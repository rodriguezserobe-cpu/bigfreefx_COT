import "../config/env.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async (to, subject, html) => {
  const sendSmtpEmail = {
    sender: {
      email: process.env.EMAIL_USER,
      name: "BigFree FX",
    },
    to: [
      {
        email: to,
      },
    ],
    subject,
    htmlContent: html,
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export default sendEmail;
