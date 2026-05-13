// Main protected task manager page
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
<<<<<<< HEAD
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
=======
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

>>>>>>> 0fd149b (changedpagetsx)
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
<<<<<<< HEAD
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
=======
    }
  }
>>>>>>> 0fd149b (changedpagetsx)

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
<<<<<<< HEAD
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
=======
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchTasks();
    });
>>>>>>> 0fd149b (changedpagetsx)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Tasks</h1>

<<<<<<< HEAD
      <p>Welcome, {user.name}</p>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleAddTask}>
        <input type="text" value={newTaskTitle} onChange={(event) => 
          setNewTaskTitle(event.target.value)} placeholder="Enter a new task" 
        />
        <button type="submit" className="addButton">Add Task</button>
      </form>
=======
      <TaskForm onTaskAdded={fetchTasks} />
>>>>>>> 0fd149b (changedpagetsx)

      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </main>
  );
}