const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");


const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req,res)=>{
    res.json({
        message:"Apparel Ecommerce API Running"
    });
});

// Connect main router
const mainRouter = require('./routes/index');
app.use('/api/v1', mainRouter);


module.exports = app;