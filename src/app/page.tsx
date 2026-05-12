"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: number;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setTasks(data);
      setLoading(false);
    });
  }, []);

  function handleAddTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: newTaskTitle }),
    }).then(() => {
      setNewTaskTitle("");
      window.location.reload();
    });
  }

  function handleComplete(id: number) {
    fetch(`/api/tasks/${id}`, {
      method: "PATCH",
    }).then(() => {
      window.location.reload();
    });
  }

  function handleDelete(id: number) {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Tasks#2</h1>

      <form onSubmit={handleAddTask}>
        <input type="text" value={newTaskTitle} onChange={(event) => 
          setNewTaskTitle(event.target.value)} placeholder="Enter a new task" 
        />
        <button type="submit" className="addButton">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.completed ? "✔" : "☐"} {task.title}

            {!task.completed && (
            <button className="completeButton"onClick={() => handleComplete(task.id)}>Complete</button>
            )}
            <button className="deleteButton"onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}