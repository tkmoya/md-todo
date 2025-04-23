import type { Todo } from "@/types/todo";
import TodoCard from "./todo-card";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoCard todo={todo} />
        </li>
      ))}
    </ul>
  );
}
