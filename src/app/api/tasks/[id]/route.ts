import { completeTask, deleteTask } from "@/data/queries";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  await completeTask(id);

  return Response.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  await deleteTask(id);

  return Response.json({ ok: true });
}