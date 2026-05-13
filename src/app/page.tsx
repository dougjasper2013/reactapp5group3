"use client";

import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/taskform";
import { getTasks, updateTask, deleteTask } from "@/api";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: number;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();

    setTasks(data);
  }

useEffect(() => {
  async function loadTasks() {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  loadTasks();
}, []);



function handleComplete(id: number) {
  fetch(`/api/tasks/${id}`, {
    method: "PATCH",
  }).then(() => {
    fetchTasks();
  });
}

  function handleDelete(id: number) {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchTasks();
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Tasks</h1>

      <TaskForm onTaskAdded={fetchTasks} />

      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </main>
  );
}