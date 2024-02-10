const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Conneceted to database");
  } catch (err) {
    console.log(err);
    console.log("Could not connect to database");
  }
};
