import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
 
export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  created_at: integer("created_at").default(Date.now()),
  completed: integer("completed").default(0),
  priority: text("priority").default("medium"),
  due_date: integer("due_date"),
});