import jwt, { Secret } from "jsonwebtoken";
import axios from "axios";

const generateNotifyAuthToken = async () => {
  const iss: string | undefined = process.env.NOTIFY_AUTH_TOKEN_SERVICEID;
  const secretKey: Secret | undefined = process.env.NOTIFY_AUTH_TOKEN_SECRET;

  if (!iss || !secretKey) {
    throw new Error("Missing environment variables");
  }
  const iat: number = Math.floor(Date.now() / 1000);
  const payload = {
    iss,
    iat,
  };
  const encodedToken: string = jwt.sign(payload, secretKey);
  return encodedToken;
};

export async function sendEmail(
  emailTemplate: string,
  Recipient: string,
  emailData: any
) {
  const apiUrl: string | undefined = process.env.NOTIFY_EMAIL_API_URL;

  if (!apiUrl) {
    throw new Error("Missing environment variables");
  }
  const token = await generateNotifyAuthToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  console.log(emailData);
  try {
    const response = await axios.post(
      apiUrl,
      {
        email_address: Recipient,
        template_id: emailTemplate,
        personalisation: emailData
      },
      { headers }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendTextNotification(
  messageTemplate: string,
  Recipient: string,
  messageData: any
) {
  const apiUrl: string | undefined = process.env.NOTIFY_TEXT_MESSAGE_API_URL;

  if (!apiUrl) {
    throw new Error("Missing environment variables");
  }
  const token = await generateNotifyAuthToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      apiUrl,
      {
        phone_number: Recipient,
        template_id: messageTemplate,
        personalisation: messageData
      },
      { headers }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
