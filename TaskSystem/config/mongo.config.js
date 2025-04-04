const mongoose = require('mongoose');
const connectToDb = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Connected to db");
      })
      .catch((err) => {
        console.log("err in connecting db");
        console.log(err)
      });
  };
module.exports = connectToDb;  
