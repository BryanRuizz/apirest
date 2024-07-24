const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
const apicache = require("apicache");
const cache = apicache.middleware;

const v1workoutRouter = require("./v1/routes/workoutRoutes.js");
const { swaggerDocs: V1swaggerDocs } = require("./v1/swagger.js");

app.use(cors());
app.use(express.json());
app.use(cache("2 minutes"));

app.use("/api/v1/workouts", v1workoutRouter);

app.listen(PORT, () => {
    console.log(`⚡ Server listening on port ${PORT}`);
    V1swaggerDocs(app, PORT);
});

module.exports = app;
