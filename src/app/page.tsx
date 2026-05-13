// Main protected task manager page
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TaskList from "@/components/TaskList";

type Task = {
  id: number;
  title: string;
  completed: number;
};

type User = {
  id: number;
  email: string;
  name: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  // Stores authenticated user information
  const [user, setUser] = useState<User | null>(() => {
    // Checks if a user session already exists in localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
 
  useEffect(() => {
    if (!user) return;

    fetch("/api/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setTasks(data);
      setLoading(false);
    });
  }, [user]);  

  // Clears local user session and logs the user out
  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

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

  // Prevents access to the task manager unless logged in  
  if (!user) {
    return (
      <main>
        <h1>You must log in first</h1>
        <Link href="/login">Go to Login</Link>
      </main>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Tasks#2</h1>

      <p>Welcome, {user.name}</p>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleAddTask}>
        <input type="text" value={newTaskTitle} onChange={(event) => 
          setNewTaskTitle(event.target.value)} placeholder="Enter a new task" 
        />
        <button type="submit" className="addButton">Add Task</button>
      </form>

      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </main>
  );
}