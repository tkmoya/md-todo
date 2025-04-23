"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodo } from "@/app/action";
import { CreateTodo } from "@/types/todo";
import { createTodoSchema } from "@/lib/validation-schema/taskSchema";
import { convertMarkdownToHtml } from "@/lib/markdown/markdown";

export default function AddTodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodo>({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = async (data: CreateTodo) => {
    const createData = {
      ...data,
      description: await convertMarkdownToHtml(data.description), // マークダウンをHTMLに変換
    };
    await createTodo(createData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-4">
        <label htmlFor="title">タイトル</label>
        <input id="title" {...register("title")} className="border-2 p-2" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="description">内容</label>
        <textarea
          id="description"
          {...register("description")}
          rows={10}
          className="border-2 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="priority">優先度</label>
        <select
          id="priority"
          {...register("priority")}
          className="border-2 p-2"
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="due_date">期限</label>
        <input
          id="due_date"
          type="date"
          {...register("due_date")}
          className="border-2 p-2"
        />
      </div>
      <label className="flex gap-x-2 items-center justify-center">
        完了
        <input {...register("completed")} type="checkbox" className="w-4 h-4" />
      </label>
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full max-w-xs bg-amber-400 px-4 py-3 rounded-md text-center"
        >
          {isSubmitting ? "作成中..." : "作成"}
        </button>
      </div>
    </form>
  );
}
