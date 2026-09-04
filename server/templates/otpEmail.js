const otpEmailTemplate = (otp) => {
    return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial,sans-serif;">

        <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden;">

            <div style="background:#4f46e5; padding:25px; text-align:center; color:white;">
                <h1>MailGen AI</h1>
                <p>AI-powered cold outreach</p>
            </div>

            <div style="padding:35px;">
                <h2 style="color:#111827;">Verify your email</h2>

                <p style="color:#4b5563;">
                    Thank you for signing up for MailGen AI.
                    Please use the verification code below.
                </p>

                <div style="
                    margin:30px 0;
                    padding:20px;
                    background:#eef2ff;
                    border-radius:10px;
                    text-align:center;
                ">
                    <span style="
                        font-size:32px;
                        font-weight:bold;
                        letter-spacing:8px;
                        color:#4f46e5;
                    ">
                        ${otp}
                    </span>
                </div>

                <p style="color:#6b7280;">
                    This verification code is valid for 10 minutes.
                </p>

                <p style="color:#6b7280;">
                    If you did not create an account with MailGen AI,
                    you can safely ignore this email.
                </p>

                <p style="color:#374151;">
                    For security reasons, never share this code with anyone.
                </p>
            </div>

            <div style="
                padding:20px;
                text-align:center;
                background:#f9fafb;
                color:#9ca3af;
                font-size:13px;
            ">
                © 2026 MailGen AI. All rights reserved.
            </div>

        </div>

    </body>
    </html>
    `;
};

module.exports = otpEmailTemplate;