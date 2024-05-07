const Notificationmessage = require("../models/NotificationMessageModal");


//To Display Notification Message
const notificationmessage = async (req, res) => {
    try {

      
        const notificationMessages = await Notificationmessage.findAll({
            order: [['createdAt', 'DESC']]
        });


        res.json(notificationMessages); // Return the array of notification messages
    } catch (error) {
        console.log("Error fetching notification messages:", error);
        res.status(500).json({ error: 'An error occurred while fetching notification messages' });
    }
}

module.exports = {
    notificationmessage
}
