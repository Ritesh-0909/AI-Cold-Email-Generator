const twilio = require('twilio');

const makeVoiceCall = async (phone, otp) => {

    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    const call = await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
        url: 'https://webhooks.twilio.com/v1/Voice/Template/voice_text_to_speech'
    });

    console.log("Voice OTP call initiated:", call.sid);

    return call;
};

module.exports = makeVoiceCall;