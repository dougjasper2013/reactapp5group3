import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.DB_URL || "file:src/data/tasks.db",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");

  const result = await client.execute({
    sql: "SELECT * FROM tasks WHERE username = ? ORDER BY id DESC",
    args: [username || ""],
  });

  return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
  const body = await request.json();

  await client.execute({
    sql: `
      INSERT INTO tasks 
      (username, title, dueDate, isRecurring, completed)
      VALUES (?, ?, ?, ?, ?)
    `,
    args: [
      body.username,
      body.title,
      body.dueDate,
      body.isRecurring ? 1 : 0,
      0,
    ],
  });

  return NextResponse.json({
    message: "Task added",
  });
}