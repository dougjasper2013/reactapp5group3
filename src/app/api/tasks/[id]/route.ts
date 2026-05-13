import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.DB_URL || "file:src/data/tasks.db",
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const taskId = Number(id);

    const result = await client.execute({
      sql: "SELECT completed FROM tasks WHERE id = ?",
      args: [taskId],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    const current = Number(result.rows[0].completed);

    const newValue = current === 1 ? 0 : 1;

    await client.execute({
      sql: "UPDATE tasks SET completed = ? WHERE id = ?",
      args: [newValue, taskId],
    });

    return NextResponse.json({
      id: taskId,
      completed: newValue,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const taskId = Number(id);

    console.log("DELETE ID:", taskId);

    await client.execute({
      sql: "DELETE FROM tasks WHERE id = ?",
      args: [taskId],
    });

    return NextResponse.json({
      message: "Task deleted",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}