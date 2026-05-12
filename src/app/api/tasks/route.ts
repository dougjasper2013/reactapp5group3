import { getTasks, addTask } from "@/data/queries";


export async function GET() {
  const tasks = await getTasks();

  return Response.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();

  await addTask(body.title);

  return Response.json({ ok: true });
}

