// cronJob.js
const { CronJob } = require('cron');
const { Op } = require('sequelize');
const { File } = require('../models/FileModal'); // Import the required models
const { Account } = require('../models/AccountModal');
const { User } = require('../models/UserModel');
const { sendSMSNotification, sendTextEmailNotification } = require('./notification');

const cronExpression = '2 0 18 4 *';


const job = new CronJob(cronExpression, async() => {

    try {
        // Calculate the date 3 days before today
        const today = new Date();
        const threeDaysBefore = new Date(today);
        threeDaysBefore.setDate(today.getDate() - 3);

        // Fetch files from the database whose end dates are within the last 3 days
        const files = await File.findAll({
            where: {
                finalDate: {
                    [Op.between]: [threeDaysBefore, today]
                }
            },
            include: [
                {
                    model: Account, // Include the Account model
                    include: [
                        {
                            model: User, // Include the User model for manager details
                            // Use the alias specified in your Account/User associations
                        },
                    ],
                },
            ],
        });

        // Send notifications based on medium (Email or Mobile)
        for (const file of files) {
            const managerEmail = "nikhilscaria3@gmail.com";
            const subject = "Notifcation";
            const medium = "Email"; // Assuming medium is a field in your File model
            const notificationMessage = 'Your notification message here';

            if (medium === 'Email') {
                sendTextEmailNotification(managerEmail, subject, notificationMessage);
            }
            else if (medium === 'Mobile') {
                // Send SMS notification via Twilio
                const managerPhoneNumber = file.Account.User.phoneNumber; // Assuming phoneNumber is a field in your User model
                sendSMSNotification(managerPhoneNumber, notificationMessage);
            }
        }
    } catch (error) {
        console.error('Error fetching files or sending notifications:', error);
    }
}, null, true, 'Asia/Kolkata'); // Set Indian timezone (IST)



module.exports = { job };
