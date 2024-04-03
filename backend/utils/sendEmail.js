const nodemailer = require('nodemailer');

const sendEmail = async (sent_from, send_to, reply_to, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }

    })

    //Options for sending email
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message
    }

    //sending email
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log(info)
        }
    })
}

module.exports = sendEmail;