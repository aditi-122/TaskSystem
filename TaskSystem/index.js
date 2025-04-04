const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config();
const PORT =process.env.PORT || 8080;
const cors = require("cors");
const connectToDb = require("./config/mongo.config");
app.use(cors());
app.get("/",(req,res)=>{
    res.send("this is test route")
})
app.use("/api",require("./route/user.route"));
app.use("/api",require("./route/task.route"));
app.listen(PORT,()=>{
    connectToDb();
    console.log("server started");
})