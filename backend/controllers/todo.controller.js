const Todos = require("../models/todo.model");

const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await Todos.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findByIdAndUpdate(id, req.body);

    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }

    const updatedTodo = await Product.findById(id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }

    res.status(200).json({ message: "todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
};