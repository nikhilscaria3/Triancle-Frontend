
const path = require('path')
const env = process.env.NODE_ENV || 'development';
configPath = path.resolve(__dirname, `./.env.${env}`);

require('dotenv').config({ path: configPath });

const config = {
    env: env,
    port: process.env.PORT || 3000,
    settings: {
        filestatus: ["Active", "Inactive", "Complete", "Hold"],
        projectstatus: ["Active", "Inactive", "Complete", "Hold"]
    },
    app: {
        availabletype: process.env.AVAILABLE_INDUSTRY || ["Construction", "Education"],
        type: process.env.INDUSTRY || "construction",
        name: 'Lyndell Backend Service',
        apiPrefix: '/api',
        apiVersion: '/v1',
        projectprefix: "TIGRID",
        doc: {
            path: '/api/docs',
            auth: false
        },
    },
    [env
    ]: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        seederStorage: 'sequelize',
        seederStorageTableName: 'SeedInfo',
    }
}


module.exports = config;