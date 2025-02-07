/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { createContext } from "react";

export const TodosContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  //* add new todo
  const addTodo = async (title) => {
    try {
      const response = await fetch("http://localhost:7000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //* edit todo
  const editTodo = async (id, newTitle) => {
    try {
      const response = await fetch(`http://localhost:7000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, title: updatedTodo.title } : todo
        )
      );
    } catch (error) {
      console.error("Error editing todo:", error.message);
    }
  };
  //* remove todo
  const removeTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error removing todo:", error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, addTodo, editTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
};
