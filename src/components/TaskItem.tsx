
"use client";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: number;
};

type TaskItemProps = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({
  task,
  onComplete,
  onDelete,
}: TaskItemProps) {
  return (
    <li className={task.completed ? "completed" : ""}>
      <div>
        <strong>Task:</strong> {task.completed ? "✔ " : "☐ "}{task.title}
      </div>

      <div>
        <strong>Description:</strong> {task.description}
      </div>

      {!task.completed && (
        <button onClick={() => onComplete(task.id)}>
          Complete
        </button>
      )}

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}