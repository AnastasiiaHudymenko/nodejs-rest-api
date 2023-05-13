const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Anastasia:RBDPUJCnqwkzK5Or@cluster0.kmhxppp.mongodb.net/contacts_64?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
