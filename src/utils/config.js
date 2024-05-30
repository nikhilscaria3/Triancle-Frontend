// config.js
const config = {
    NODE_ENV: "production",
    BackendURL: "http://18.209.7.75:5000/api/v1",
    SocketBackendURL: "http://18.209.7.75:5000",
    settings: {
        filestatus: ["Active", "Inactive", "Complete", "Hold"],
        projectstatus: ["Active", "Inactive", "Complete", "Hold"],
        availableTypes: ["Residential", "Commercial", "Government", "Interior", "Institutional"],
        type: ["construction"],
        projectprefix: "LYNTELL"
    },
};

export default config;
