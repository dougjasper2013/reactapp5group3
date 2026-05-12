import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.DB_URL || "file:src/data/tasks.db",
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await client.execute({
    sql: "UPDATE tasks SET completed = 1 WHERE id = ?",
    args: [id],
  });

  return NextResponse.json({
    message: "Task completed",
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await client.execute({
    sql: "DELETE FROM tasks WHERE id = ?",
    args: [id],
  });

  return NextResponse.json({
    message: "Task deleted",
  });
}