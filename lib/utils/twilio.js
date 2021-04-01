require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken)

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

const sendSms = (message) => {
  return twilio.messages
    .create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to:process.env.MY_NUMBER
  });
};

module.exports = {
  sendSms,
}