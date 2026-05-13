"use client";

type Task = {
  id: number;
  title: string;
  completed: number;
};

type TaskItemProps = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
  return (
    <li>
      {task.completed ? "✔" : "☐"} {task.title}

      {!task.completed && (
        <button className="completeButton" onClick={() => onComplete(task.id)}>
          Complete
        </button>
      )}
      <button className="deleteButton" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}
