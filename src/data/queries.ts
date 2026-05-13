import { createClient } from "@libsql/client";

export async function getTasks() {
  const client = createClient({
    url: process.env.DB_URL ?? "",
  });

  const data = await client.execute(
    "SELECT id, title, description, completed FROM tasks"
  );

  client.close();

  return data.rows;
}

export async function addTask(title: string, description: string) {
  const client = createClient({
    url: process.env.DB_URL ?? "",
  });

  await client.execute({
    sql: "INSERT INTO tasks (title, description, completed) VALUES (?, ?, 0)",
    args: [title, description],
  });

  client.close();
}

export async function completeTask(id: number) {
  const client = createClient({
    url: process.env.DB_URL ?? "",
  });

  await client.execute({
    sql: "UPDATE tasks SET completed = 1 WHERE id = ?",
    args: [id],
  });

  client.close();
}

export async function deleteTask(id: number) {
  const client = createClient({
    url: process.env.DB_URL ?? "",
  });

  await client.execute({
    sql: "DELETE FROM tasks WHERE id = ?",
    args: [id],
  });

  client.close();
}