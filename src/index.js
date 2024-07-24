const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
const apicache = require("apicache");
const cache = apicache.middleware;
// const v1router = require("./v1/routes/index.js");

const v1workoutRouter = require("./v1/routes/workoutRoutes.js");
const { swaggerDocs: V1swaggerDocs } = require("./v1/swagger.js");

app.use(cors());

// app.use("/api/v1",v1router);

app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>");
})


//middlware implemantation, every req pass for there, http req that are in json format, 
//this middle transform ur json to an js obj and attched. 
app.use(express.json());
app.use(cache("2 minutes"));//be careful with this, sometimes doesnot work as it should, doesnt clear the cache sometimes??
app.use("/api/v1/workouts", v1workoutRouter);



app.listen(PORT, () => {

    console.log(`⚡ Server listening on port ${PORT}`);
    V1swaggerDocs(app, PORT);
});

export default app;