import { Hono } from "hono";
import { handle } from "hono/vercel";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { todos } from "@/drizzle/schema";

export const runtime = "edge";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

// 件数取得
app.get("/todos/count", async (c) => {
  const db = drizzle(process.env.DB);
  try {
    const res = await db.$count(todos);
    return c.json({ count: res });
  } catch (error) {
    return c.json({ error: error }, 500);
  }
});

// 1件取得
app.get("/todos/:id", async (c) => {
  const db = drizzle(process.env.DB);
  const id = parseInt(c.req.param("id"));
  try {
    const res = await db.select().from(todos).where(eq(todos.id, id));
    return c.json(res);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
});

// 全件取得
app.get("/todos", async (c) => {
  const db = drizzle(process.env.DB);
  try {
    const res = await db.select().from(todos);
    return c.json(res);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
});

export const GET = handle(app);

// 1件削除
app.delete("/todos/:id", async (c) => {
  const db = drizzle(process.env.DB);
  const id = parseInt(c.req.param("id"));
  try {
    await db.delete(todos).where(eq(todos.id, id));
    return c.json({ message: "Deleted" }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

export const DELETE = handle(app);

// 新規作成
app.post("/todos", async (c) => {
  const db = drizzle(process.env.DB);
  const { title, description, completed, priority, due_date } =
    await c.req.json();
  try {
    await db.insert(todos).values({
      title,
      description,
      created_at: new Date().getTime(),
      completed,
      priority,
      due_date: due_date ? new Date(due_date).getTime() : null,
    });
    return c.json({ message: "Created" }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

export const POST = handle(app);

// 1件更新
app.put("/todos/:id", async (c) => {
  const db = drizzle(process.env.DB);
  const id = parseInt(c.req.param("id"));
  const { title, description, completed, priority, due_date } =
    await c.req.json();
  try {
    await db
      .update(todos)
      .set({
        title,
        description,
        completed,
        priority,
        due_date: due_date ? new Date(due_date).getTime() : null,
      })
      .where(eq(todos.id, id));
    return c.json({ message: "Updated" }, 200);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

export const PUT = handle(app);
