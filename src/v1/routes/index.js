const express = require("express");
const router = express.Router();

router
      .route("/")
      .get((req,res)=>{
        res.send(`<h1>HI from ./src/v1/routes/index.js ${req.baseUrl} </h1>`);
      })

module.exports = router;