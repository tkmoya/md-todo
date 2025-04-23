"use server";

import { redirect } from "next/navigation";
import { CreateTodo, Todo } from "@/types/todo";

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${process.env.API_URL}/api/todos`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`${process.env.API_URL}/api/todos/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch the todo");
  }
  return res.json();
}

export async function getTodoCount() {
  const res = await fetch(`${process.env.API_URL}/api/todos/count`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json() as { count: number };
  return data.count ?? 0;;
}


export async function createTodo({
  title,
  description,
  completed,
  priority,
  due_date,
}: CreateTodo) {
  try {
    // レコード数のチェック
    const count = await getTodoCount();
    if (count > 50) {
      throw new Error("Todoの上限に達しました");
    }
    await fetch(`${process.env.API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, completed, priority, due_date }),
    });
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw new Error("Todoの作成に失敗しました");
  }
  redirect('/');
}

export async function deleteTodo(id: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/todos/${id}`, {
      method: 'DELETE',
      next: { revalidate: 0 }
    });
    if (!res.ok) {
      throw new Error('削除に失敗しました');
    }
  } catch (error) {
    console.error(error);
  }
  redirect('/');
};

export async function updateTodo(id: number, data: CreateTodo) {
  await fetch(`${process.env.API_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  redirect('/');
}
