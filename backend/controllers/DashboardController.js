const { User } = require('../models/UserModel');
const { Account } = require('../models/AccountModal');
const { File } = require('../models/FileModal');

const countDocuments = async (req, res) => {
    try {
        // Get counts of documents in User, Account, and File tables
        const userCount = await User.count();
        const projectCount = await Account.count();
        const fileCount = await File.count();

        // Get counts of documents with status true and false for each table
        const userStatusCounts = await User.aggregate('status', 'count', { plain: false, group: ['status'] });
        const projectStatusCounts = await Account.aggregate('status', 'count', { plain: false, group: ['status'] });
        const fileStatusCounts = await File.aggregate('status', 'count', { plain: false, group: ['status'] });

        // Construct response object
        const response = {
            userCount,
            projectCount,
            fileCount,
            userStatusCounts,
            projectStatusCounts,
            fileStatusCounts
        };

        // Send counts as JSON response
        res.json(response);
    } catch (error) {
        console.error('Error retrieving document counts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    countDocuments
};

