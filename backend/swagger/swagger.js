const fs = require('fs');
const path = require('path');

class Swagger {
    constructor(app) {
        this.app = app;
    }

    start() {
        const swaggerUi = require('swagger-ui-express');
        const swaggerDocument = this.combineSwaggerFiles();
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    combineSwaggerFiles() {
        const swaggerJSON = {
            swagger: '2.0',
            info: {
                title: 'Lyntell API',
                version: '1.0.0',
                description: 'API for Construction Management System',
            },
            servers: [
                {
                    url: 'http://localhost:5000',
                    description: 'Local server',
                },
            ],
            paths: {},
        };

        // Group APIs by functionality
        const routeFiles = [
            "calendar_routes.json",
            "invoice_routes.json",
            "checklist_routes.json",
            "project_routes.json",
            "user_routes.json"
        ];

        routeFiles.forEach((file) => {
            const filePath = path.join(__dirname, file);
            const routes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

              Object.assign(swaggerJSON.paths, routes);
        });

        return swaggerJSON;
    }
}

module.exports = Swagger;
