"use client";

import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/taskform";

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

  async function handleComplete(id: number) {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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