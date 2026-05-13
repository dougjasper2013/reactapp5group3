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

type User = {
  id: number;
  email: string;
  name: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();

    setTasks(data);
  }

useEffect(() => {
  if (!user) {
    setLoading(false);
    return;
  }

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
}, [user]);



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

  function handleLogout() {
    localStorage.removeItem("user")
    setUser(null);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <main>
        <h1>You must log in first</h1>
        <button onClick={() => window.location.href = "/login"}>
          Login
        </button>
      </main>
    )
  }

  return (
    <main>
      <h1>Tasks</h1>

      <p>Welcome, {user.name}</p>
      <button onClick={handleLogout}>Logout</button>

      <TaskForm onTaskAdded={fetchTasks} />

      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </main>
  );
}