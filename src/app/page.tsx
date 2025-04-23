import TodoList from "@/components/todo/todo-list";
import { getTodos } from "@/app/action";
import Link from "next/link";
 
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
 
export default async function Home() {
  try {
    const todos = await getTodos();
    return (
      <div>
        <main>
          <h1 className="text-center text-2xl mb-6">Todoリスト一覧</h1>
          <TodoList todos={todos} />
          <Link
            href="/create"
            className="block max-w-lg mx-auto mt-8 bg-amber-400 px-4 py-3 rounded-md text-center"
          >
            作成ページへ
          </Link>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading todos:", error);
    return (
      <div>
        <main>
          <h1 className="text-center text-2xl mb-6">エラーが発生しました</h1>
          <p className="text-center text-red-500">
            データの読み込み中にエラーが発生しました。しばらくしてから再度お試しください。
          </p>
        </main>
      </div>
    );
  }
}