import { z } from "zod";
 
export const todoSchema = z.object({
  id: z.number(),
  title: z.string({ required_error: 'タイトルを入力してください' })
          .trim()
          .min(2, { message: '2文字以上入力してください' })
          .max(20, { message: '20文字以内にしてください' }),
  description: z.string(),
  created_at: z.string(),
  completed: z.boolean(),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  due_date: z.string().optional(),
});
 
export const createTodoSchema = todoSchema.omit({
  id: true,
  created_at: true,
});