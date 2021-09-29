const { body } = require("express-validator");

exports.createTodoCheck = [
  body("data.task").isLength({ min: 5, max: 20 }),
  body("data.order").isNumeric(),
  body("data.active").isBoolean(),
];
