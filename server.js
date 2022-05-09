const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = require("./app");

// DB CONNECTION
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log("DB connection error: ", err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
