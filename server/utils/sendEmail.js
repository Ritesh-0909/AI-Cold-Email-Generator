const { Resend } = require('resend');
const otpEmailTemplate = require('../templates/otpEmail');

const sendEmail = async (options) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not set in environment variables");
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'MailGen AI <onboarding@resend.dev>',
            to: [options.to],
            subject: options.subject,
            text: options.text,
            html: otpEmailTemplate(options.otp)
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log("Email sent successfully:", data.id);
        return data;

    } catch (error) {
        console.log("Error sending email:", error.message);
        throw error;
    }
};

module.exports = sendEmail;