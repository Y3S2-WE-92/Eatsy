const axios = require('axios');

exports.sendSMS = async (phone, message) => {
  try {
    const response = await axios.post('https://api.twilio.com/2010-04-01/Accounts/' + process.env.TWILIO_ACCOUNT_SID + '/Messages.json', {
      Body: message,
      From: process.env.TWILIO_PHONE_NUMBER,
      To: phone
    }, {
      auth: {
        username: process.env.TWILIO_ACCOUNT_SID,
        password: process.env.TWILIO_AUTH_TOKEN
      }
    });
    console.log('SMS sent:', response.data.sid);
  } catch (error) {
    console.error('SMS error:', error);
  }
};

exports.sendEmail = async (to, subject, text) => {
  try {
    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'no-reply@fooddelivery.com' },
      subject,
      content: [{ type: 'text/plain', value: text }]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
      }
    });
    console.log('Email sent');
  } catch (error) {
    console.error('Email error:', error);
  }
};