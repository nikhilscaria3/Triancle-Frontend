// utils/encryption.js

const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

module.exports = { encryptPassword };
