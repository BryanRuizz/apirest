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

app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>");
});

const PORT = process.env.PORT || 3000;
V1swaggerDocs(app, PORT);

module.exports = (req, res) => {
    app(req, res);
};
