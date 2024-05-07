const jwt = require('jsonwebtoken');
const { User, Role } = require('../models/UserModel');

const authMiddleware = async (req, res, next) => {
    // Check if the header is present in the request
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No authorization header provided' });
    }

    // Split the authorization header to get the token
    const tokenParts = req.headers.authorization.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    const token = tokenParts[1];
console.log(token);
    // Perform your authentication logic here
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
        // Check if the user exists and the token is valid
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.status(403).json({ auth: false, message: 'Invalid token' });
        }

        // Token is valid, decoded contains the payload
        // You can perform additional checks here if needed
        req.email = decoded.email; // Example: Store user ID in the request object for further use
        req.id = user.id;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Token verification failed, send a 401 Unauthorized response
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};


const authAdminMiddleware = async (req, res, next) => {
    // Check if the header or token is present in the request
    const token = req.headers.authorization.split(' ')[1];

    // Perform your authentication logic here
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists and the token is valid
        const user = await User.findOne({
            where: {
                email: decoded.email
            },
            include: Role
        });

        if (!user) {
            return res.status(403).json({ auth: false, message: 'Invalid token' });
        }

        if (user.Role.roletype !== "Admin") {
            return res.status(403).send({ auth: false, message: 'You are not authorized to do this action.' });
        }

        req.user = user.name;
        req.role = user.Role.roletype;

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        // Token verification failed, send a 401 Unauthorized response
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};
module.exports = { authMiddleware, authAdminMiddleware };
