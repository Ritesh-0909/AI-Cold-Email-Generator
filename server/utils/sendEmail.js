const axios = require('axios');
const otpEmailTemplate = require('../templates/otpEmail');

const sendEmail = async (options) => {
    try {
        if (!process.env.BREVO_API_KEY) {
            throw new Error("BREVO_API_KEY is not set in environment variables");
        }

        if (!process.env.BREVO_SENDER_EMAIL) {
            throw new Error("BREVO_SENDER_EMAIL is not set in environment variables");
        }

        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: {
                    name: 'MailGen AI',
                    email: process.env.BREVO_SENDER_EMAIL
                },
                to: [
                    {
                        email: options.to
                    }
                ],
                subject: options.subject,
                textContent: options.text,
                htmlContent: otpEmailTemplate(options.otp)
            },
            {
                headers: {
                    'api-key': process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 30000
            }
        );

        console.log("Email sent successfully:", response.data.messageId);
        return response.data;

    } catch (error) {
        console.log(
            "Error sending email:",
            error.response?.data || error.message
        );

        throw error;
    }
};

module.exports = sendEmail;