const BASE_URL = "http://localhost:3001/tasks";

export const getTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json(); // assume tasks have { id, title, completed: 0|1 }
};

export const addTask = async (task: { title: string; completed: number }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  return res.json();
};

export const updateTask = async (
  id: number,
  updates: { completed: number }
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return res.json();
};

export const deleteTask = async (id: number) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};