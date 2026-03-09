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



// const mongoose = require("mongoose");

// const connectToDB = () => {
//   mongoose
//     .connect("mongodb://127.0.0.1:27017/Stocks")
//     .then(() => {
//       console.log("Connected to MongoDB");
//     })
//     .catch((e) => console.log(`Error in db connection ${e}`));
// };

// module.exports = connectToDB;