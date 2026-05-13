"use client";

import { useState } from "react";

type TaskFormProps = {
  onTaskAdded: () => void;
};

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    if (!dueDate) {
      alert("Please select a due date");
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
          dueDate,
          isRecurring,
        }),
      });

      setTitle("");
      setDueDate("");
      setIsRecurring(false);
      onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="taskTitle">Task Title</label>
      <input
        id="taskTitle"
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="dueDate">Due Date</label>
      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(event) => setIsRecurring(event.target.checked)}
        />
        Recurring Task
      </label>

      <button type="submit">Add Task</button>
    </form>
  );
}