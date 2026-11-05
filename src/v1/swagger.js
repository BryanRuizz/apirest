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
                // url: "http://localhost:3000",
                url: "https://apirest2.vercel.app",
                description: "API Documentation"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["src/v1/routes/workoutRoutes.js", "src/v1/routes/authRoutes.js", "src/database/Workout.js", "src/database/Record.js"],
};

const swaggerSpec = swaggerJSDoc(options);


const swaggerDocs = (app, port) => {

    app.use(
        "/api/v1/docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerSpec)
    );

    app.get("/api/v1/docs.json", (req, res) => {
        res.json(swaggerSpec);
    });

        console.log(`📓 Swagger Docs are available at https://apirest2.vercel.app/api/v1/docs`);
    // console.log(
    //      `📓 Swagger Docs: http://localhost:${port}/api/v1/docs`
    // );
};

module.exports = { swaggerDocs };
