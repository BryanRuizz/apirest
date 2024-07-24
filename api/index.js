const express = require("express");
const cors = require("cors");
const apicache = require("apicache");
const v1workoutRouter = require("../src/v1/routes/workoutRoutes.js");
const { swaggerDocs: V1swaggerDocs } = require("../src/v1/swagger.js");

const app = express();
const cache = apicache.middleware;

app.use(cors());
app.use(express.json());
app.use(cache("2 minutes"));

app.use("/api/v1/workouts", v1workoutRouter);

// Sirve la documentación de Swagger en la ruta principal
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Middleware para la documentación de Swagger
V1swaggerDocs(app, PORT);

const PORT = process.env.PORT || 3000;

module.exports = (req, res) => {
    app(req, res);
};
