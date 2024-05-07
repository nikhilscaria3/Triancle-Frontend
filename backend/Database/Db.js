
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',  // Specify the dialect as 'postgres' for PostgreSQL
    host: process.env.DB_HOST,  // PostgreSQL host
    port: process.env.DB_PORT,           // PostgreSQL port
    username: process.env.DB_USERNAME, // PostgreSQL username
    password: process.env.DB_PASSWORD, // PostgreSQL password
    database: process.env.DB_DATABASE, // PostgreSQL database name
});

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Export Sequelize instance and testConnection function
module.exports = {
    sequelize,
    testConnection,
};
