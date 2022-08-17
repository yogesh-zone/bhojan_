const app = require("./app");
const connectDatabase = require("./config/database");
const User = require("./DBmodels/userModel");

connectDatabase();

if(process.env.NODE_ENV !=="production")
    require("dotenv").config({path : "backend/config/config.env"})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http:\\localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });