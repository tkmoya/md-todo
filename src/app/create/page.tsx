import AddTodoForm from '@/components/todo/add-todo-form';
 
export const runtime = 'edge';
 
export default function Create() {
  return (
    <div>
      <h1 className='text-center text-2xl mb-6'>Todo作成</h1>
      <AddTodoForm />
    </div>
  );
}