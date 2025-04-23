import { getTodo } from "@/app/action";
import EditTodoForm from "@/components/todo/edit-todo-form";
 
export default async function Edit({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const todo = await getTodo(id);
  const singleTodo = Array.isArray(todo) ? todo[0] : todo;
 
  return (
    <div>
      <h1 className='text-center text-2xl mb-6'>Todo編集</h1>
      <EditTodoForm todo={singleTodo} />
    </div>
  )
}

export const dynamic = 'force-dynamic';
export const runtime = 'edge';