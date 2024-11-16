import AddTodo from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

export default function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Todo App
          </h1>
          <AddTodo />
          <TodoList/>
        </div>
      </div>
    </TodoProvider>
  );
}
