import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export const TodoList = () => {
  const { todos } = useContext(TodosContext);
 return (
 <div className="space-y-3">
  {todos.map(todos => 
  (
    <TodoItem key={todos.id} todos={todos}/>
  ))}
 
 </div>
 )
}
