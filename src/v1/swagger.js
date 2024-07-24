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
                url: "https://apirest2.vercel.app", // Cambia esto si tu URL en Vercel es diferente
                description: "API Documentation"
            }
        ]
    },
    apis: ["src/v1/routes/*.js"], // Asegúrate de que la ruta sea correcta
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`📓 Swagger Docs are available at https://apirest2.vercel.app/api/v1/docs`);
};

module.exports = { swaggerDocs };
