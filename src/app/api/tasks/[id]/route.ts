import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.DB_URL || "file:src/data/tasks.db",
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  // get current task
  const result = await client.execute({
    sql: "SELECT completed FROM tasks WHERE id = ?",
    args: [id],
  });

  const current = result.rows[0]?.completed ?? 0;

  const newValue = current === 1 ? 0 : 1;

  await client.execute({
    sql: "UPDATE tasks SET completed = ? WHERE id = ?",
    args: [newValue, id],
  });

  return NextResponse.json({
    id,
    completed: newValue,
  });
}