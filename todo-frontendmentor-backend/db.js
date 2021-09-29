const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/todo-frontendmentor003", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("DB connected"))
    .catch(() => {
      console.log("Uuups something went wrong with db connection");
      process.exit(1);
    });
};

module.exports = connectDB;
