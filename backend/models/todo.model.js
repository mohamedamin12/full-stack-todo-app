const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter to title"],
    },

  },
  {
    timestamps: true,
  }
);


const Todos = mongoose.model("Todos", TodoSchema);

module.exports = Todos;