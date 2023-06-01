const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

const app = require("./app");

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
