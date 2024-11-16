/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { TodosContext } from "../context/TodoContext";

const TodoItem = ({ todos }) => {
  const { editTodo, removeTodo } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todos.title);

  const handleError = (error, action) => {
    console.error(`${action} failed:`, error.message);
    alert(`${action} failed: ${error.message}`);
  };
  

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this todo?"
      );
      if (confirmDelete) {
        await removeTodo(id);
      }
    } catch (error) {
      handleError(error, "Delete Todo");
    }
  };

  const handleEdit = async () => {
    if (newTitle.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }
    try {
      await editTodo(todos._id, newTitle);
      setIsEditing(false);
    } catch (error) {
      handleError(error, "Edit Todo");
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span
          className={`flex-1 ${
            todos.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todos.title}
        </span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="text-green-500 hover:text-green-700 transition duration-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => handleDelete(todos._id)}
          className="text-red-500 hover:text-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
