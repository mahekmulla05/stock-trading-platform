const mongoose = require("mongoose");

 const connectToDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/Stocks", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MONGO DB");
    })
    .catch((e) => console.log(`Error in db connection ${e}`));
};

module.exports = connectToDB;