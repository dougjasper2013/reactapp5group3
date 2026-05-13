"use client";

import { useState } from "react";

type TaskFormProps = {
  onTaskAdded: () => void;
};

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a task description");
      return;
    }
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description
         
        }),
      });

      setTitle("");
      setDescription("");


      onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        placeholder="Enter task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}