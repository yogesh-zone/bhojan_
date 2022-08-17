const express = require("express");
const app = express();
const path = require("path");
const errorMiddleware = require("./middleWare/error")
const cookieParser = require("cookie-parser");

// console.log("hole env ",process.env)
// all routes import
const sample = require("./routes/sampleroute");
const user = require("./routes/userRoute");
const restarunt = require("./routes/restaurantRoute");
const item = require("./routes/itemRoute");

app.use(express.json());
app.use(cookieParser());


// middleWare for Routes
app.use("/users",user);
app.use("/restaurant",restarunt)
app.use("/home",sample);
app.use("/items/api/y1",item);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// middleWare for Errors
app.use(errorMiddleware);

// $env:NODE_ENV = 'devlopement'  -->before running the app set environement by writing this into terminal 
// writing one time will set it always 

if(process.env.NODE_ENV !=="production")
    require("dotenv").config({path : "backend/config/config.env"})

app.get("*",(req,res)=>{
    res.send("hello hi");
    // res.render(__dirname,"  ");
})

module.exports = app;
// aggile