'use client';
 
import { Todo } from "@/types/todo";
import { deleteTodo } from "@/app/action";
 
export default function TodoActions({ todo }: { todo: Todo }) {
 
  const handleDelete = async () => {
    const confirmDelete = window.confirm("本当に削除しますか？");
    if (!confirmDelete) return;
    await deleteTodo(todo.id);
  };
 
  return (
    <div className="flex gap-x-4">
      <a href={`/edit/${todo.id}`}
        className="bg-emerald-800 text-white px-4 py-2 rounded-md"
      >編集
      </a>
      <button
        onClick={handleDelete}
        className="bg-rose-600 text-white px-4 py-2 rounded-md"
      >
        削除
      </button>
    </div>
  )
}