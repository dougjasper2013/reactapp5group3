import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.DB_URL || "file:src/data/tasks.db",
});

export async function GET() {
  const result = await client.execute(
    "SELECT * FROM tasks ORDER BY id DESC"
  );

  return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
  const body = await request.json();

  await client.execute({
    sql: "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
    args: [body.title, body.description, 0],
  });

  return NextResponse.json({
    message: "Task added",
  });
}