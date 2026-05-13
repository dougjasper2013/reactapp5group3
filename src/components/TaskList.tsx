"use client";

import TaskItem from "./TaskItem";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: number;
};

type TaskListProps = {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
