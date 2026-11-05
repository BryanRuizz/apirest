require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const authRoutes = require("./v1/routes/authRoutes");
const v1workoutRouter = require("./v1/routes/workoutRoutes.js");

const { swaggerDocs: V1swaggerDocs } = require("./v1/swagger.js");

const app = express();
const PORT = process.env.PORT || 3000;


const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    limit: 40,               // 40 peticiones por IP
    standardHeaders: "draft-8",
    legacyHeaders: false,
     handler: (req, res) => {
        console.warn("Límite de peticiones superado:", req.ip);

        res.status(429).json({
            status: "FAILED",
            message: "Demasiadas peticiones. Inténtalo más tarde.",
        });
    },
});

// Middlewares globales
app.use(cors());
app.use("/api/v1", apiLimiter);

app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

// Autenticación
app.use("/api/v1/auth", authRoutes);

// Workouts y Cities
app.use("/api/v1/workouts", v1workoutRouter);

// Swagger
V1swaggerDocs(app, PORT);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`⚡ Server listening on port ${PORT}`);
});

module.exports = app;