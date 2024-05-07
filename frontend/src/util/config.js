// config.js
const config = {
    BackendURL: "http://localhost:5000/api/v1",
    settings: {
        filestatus: ["Active", "Inactive", "Completed", "Hold"],
        projectstatus: ["Active", "Inactive", "Completed", "Hold"],
        availableTypes: ["Construction", "Education","Healthcare"],
        type: ["construction"],
        projectprefix: "TRIANCLE"
    },

};

export default config;
