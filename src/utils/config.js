// config.js
const config = {
    BackendURL: "http://localhost:5000/api/v1",
    settings: {
        filestatus: ["Active", "Inactive", "Complete", "Hold"],
        projectstatus: ["Active", "Inactive", "Complete", "Hold"],
        availableTypes: ["Residential", "Commercial", "Government", "Interior", "Institutional"],
        type: ["construction"],
        projectprefix: "LYNDELL"
    },

};

export default config;
