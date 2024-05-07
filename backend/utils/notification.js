const nodemailer = require('nodemailer');
const twilio = require('twilio');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});


const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


// Function to send email notification
async function sendTextEmailNotification(recipientEmail, subject, message) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: recipientEmail,
            subject: subject,
            text: message
        });
        console.log('Email notification sent successfully to:', recipientEmail);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}

async function sendHtmlEmailNotification(recipientEmail, subject, message) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: recipientEmail,
            subject: subject,
            html: message
        });
        console.log('Email notification sent successfully to:', recipientEmail);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}

// Function to send SMS notification
async function sendSMSNotification(recipientNumber, message) {
    try {
        await twilioClient.messages.create({
            body: message,
            to: recipientNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        console.log('SMS notification sent successfully to:', recipientNumber);
    } catch (error) {
        console.error('Error sending SMS notification:', error);
    }
}



module.exports = {
    sendHtmlEmailNotification,
    sendTextEmailNotification,
    sendSMSNotification,
};
