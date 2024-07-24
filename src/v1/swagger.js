const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Crossfit WOD API",
            version: "1.0.0",
            description: "API documentation for Crossfit WOD"
        },
        servers: [
            {
                url: "https://apirest2.vercel.app",
                description: "API Documentation"
            }
        ]
    },
    apis: ["src/v1/routes/*.js"], // Asegúrate de que la ruta sea correcta
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
        customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css" // CDN URL para Swagger UI CSS
    }));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`📓 Swagger Docs are available at https://apirest2.vercel.app/api/v1/docs`);
};

module.exports = { swaggerDocs };
