const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo successfully");
  });
};

module.exports = connectToMongo;