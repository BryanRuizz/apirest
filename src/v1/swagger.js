const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Metadata info about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Crossfit WOD API",
            version: "1.0.0"
        },
    },
    apis: ["src/v1/routes/workoutRoutes.js", "./src/database/Workout.js"],
};

// Docs en formato JSON
const swaggerSpec = swaggerJSDoc(options);

// Función para configurar nuestros docs
const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`📓 Version 1 Docs are available at http://localhost:${port}/api/v1/docs`);
};

module.exports = { swaggerDocs, swaggerSpec, swaggerUI };
