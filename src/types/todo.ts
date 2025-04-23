import { todoSchema, createTodoSchema } from "@/lib/validation-schema/taskSchema";
import { z } from "zod";
 
export type Todo = z.infer<typeof todoSchema>
export type CreateTodo = z.infer<typeof createTodoSchema>

// export type Todo = {
//     id: number;
//     title: string;
//     description: string;
//     created_at: string;
//     completed: boolean;
//   };