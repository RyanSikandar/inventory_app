const nodemailer = require('nodemailer');

const sendEmail = async (sent_from, send_to, reply_to, subject, message) => {
    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Construct the email options
        const options = {
            from: sent_from,
            to: send_to,
            replyTo: reply_to,
            subject: subject,
            html: message
        };

        // Send the email
        const info = await transporter.sendMail(options);
        console.log("Email sent:", info.response);

        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendEmail;
