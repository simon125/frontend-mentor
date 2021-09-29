const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    active: { type: Boolean, required: true },
    order: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
