const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo
} = require("../controllers/todo.controller.js");

router.get("/", getTodos);
router.get("/:id", getTodo);

router.post("/", createTodo);

// update a todo
router.put("/:id", updateTodo);

// delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
