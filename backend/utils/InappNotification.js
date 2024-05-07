const socketIo = require('socket.io');
const { User } = require('../models/UserModel'); // Import the User model
const Notificationmessage = require('../models/NotificationMessageModal');
const jwt = require("jsonwebtoken")

function setupSocket(server) {
    const io = socketIo(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on('connection', (socket) => {
        console.log('Client connected');
        // Function to send notification to all connected users
        // Handle events like new message creation
        socket.on('message', async (message, token) => {
            console.log(`New message received: ${message}`);

            try {

                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                const getusername = await User.findOne({ where: { email: decoded.email } })
                console.log(getusername.name);


                // Save the message to the database
                const savedMessage = await Notificationmessage.create({
                    notificationmessage: message,
                    notifieduser: getusername.name
                });

                const username = getusername.name
                // Broadcast the new message to all connected clients
                io.emit('message', message, username);

                console.log('Message saved to database:', savedMessage);
            } catch (error) {
                console.error('Error saving message to database:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}

module.exports = setupSocket;
